import HeroSection from "@/components/pages/landing-page/hero-section";
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
