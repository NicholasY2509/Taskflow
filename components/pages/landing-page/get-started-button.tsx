"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function GetStartedButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleClick = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  };

  return (
    <Button
      size="lg"
      onClick={handleClick}
      className="rounded-full px-8 py-6 text-base shadow-lg"
    >
      Get Started
      <ArrowRight className="ml-1 h-4 w-4" />
    </Button>
  );
}
