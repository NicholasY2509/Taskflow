import { NextRequest, NextResponse } from "next/server";
import { createClient } from "./lib/supabase/middleware";

export async function proxy(req: NextRequest) {
    const { supabase, response } = createClient(req);

    const { data } = await supabase.auth.getUser();

    const isAuthenticated = !!data?.user;
    const path = req.nextUrl.pathname;

    const publicPath = ["/", "/login", "/register"];

    if (isAuthenticated && publicPath.includes(path)) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (!isAuthenticated && !publicPath.includes(path)) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return response;
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};