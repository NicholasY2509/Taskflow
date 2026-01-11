"use client";

import { Google } from "@/components/icon/google-icon";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export default function GoogleButton() {
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <Button
      className="w-full rounded-full bg-white border text-gray-800 hover:bg-gray-50 flex items-center justify-center gap-2"
      onClick={handleGoogleLogin}
    >
      <Google className="w-5 h-5" />
      Continue with Google
    </Button>
  );
}
