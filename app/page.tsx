import HeroSection from "@/components/landing-page/hero-section";
import { FloatingNavbar } from "@/components/layout/navbar";
import { createClient } from "@/lib/supabase/client";

export default async function Home() {
  return (
    <>
      <FloatingNavbar />
      <HeroSection />
    </>
  );
}
