import { GitHub } from "@/components/icon/github-icon";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export default function GithubButton() {
  const supabase = createClient();

  const handleGithubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) {
      console.error("Error signing in with GitHub:", error);
    }
  };
  return (
    <Button
      className="w-full rounded-full bg-gray-900 text-white hover:bg-gray-800 flex items-center justify-center gap-2"
      onClick={handleGithubLogin}
    >
      <GitHub className="w-5 h-5" />
      Continue with GitHub
    </Button>
  );
}
