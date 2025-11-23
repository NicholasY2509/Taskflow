import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log("🔵 [AUTH CALLBACK] Route called at:", new Date().toISOString());

  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  let next = searchParams.get("next") ?? "/dashboard";

  console.log("🔵 [AUTH CALLBACK] Request details:", {
    origin,
    code: code ? `${code.substring(0, 10)}...` : null,
    next,
    fullUrl: request.url
  });

  if (!next.startsWith("/dashboard")) {
    next = "/";
  }

  if (!code) {
    console.log("🔴 [AUTH CALLBACK] No code provided, redirecting to error page");
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.log("🔴 [AUTH CALLBACK] Error exchanging code for session:", error.message);
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  console.log("✅ [AUTH CALLBACK] Successfully exchanged code for session");

  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    console.log("✅ [AUTH CALLBACK] User authenticated:", {
      id: user.id,
      email: user.email,
      name: user.user_metadata.name,
      metadata: user.user_metadata
    });

    try {
      const exists = await prisma.user.findUnique({
        where: { authId: user.id }
      });

      if (!exists) {
        console.log("🟡 [AUTH CALLBACK] Creating new user in database");
        console.log("🟡 [AUTH CALLBACK] User data to create:", {
          authId: user.id,
          email: user.email,
          name: user.user_metadata.name ?? "",
          role: "ADMIN"
        });

        const newUser = await prisma.user.create({
          data: {
            authId: user.id,
            email: user.email!,
            name: user.user_metadata.name ?? "",
            role: "ADMIN",
          },
        });
        console.log("✅ [AUTH CALLBACK] User created successfully:", newUser.id);
      } else {
        console.log("✅ [AUTH CALLBACK] User already exists in database:", exists.id);
      }
    } catch (dbError) {
      console.error("🔴 [AUTH CALLBACK] Database error:", dbError);
      console.error("🔴 [AUTH CALLBACK] Error details:", {
        message: dbError instanceof Error ? dbError.message : "Unknown error",
        user: {
          authId: user.id,
          email: user.email,
          name: user.user_metadata.name
        }
      });
    }
  } else {
    console.log("🔴 [AUTH CALLBACK] No user found after session exchange");
  }

  const forwardedHost = request.headers.get("x-forwarded-host");
  const isLocalEnv = process.env.NODE_ENV === "development";

  const redirectUrl = isLocalEnv
    ? `${origin}${next}`
    : forwardedHost
      ? `https://${forwardedHost}${next}`
      : `${origin}${next}`;

  console.log("🔵 [AUTH CALLBACK] Redirecting to:", redirectUrl);

  if (isLocalEnv) {
    return NextResponse.redirect(`${origin}${next}`);
  } else if (forwardedHost) {
    return NextResponse.redirect(`https://${forwardedHost}${next}`);
  } else {
    return NextResponse.redirect(`${origin}${next}`);
  }

}
