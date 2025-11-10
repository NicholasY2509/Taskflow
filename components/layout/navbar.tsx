"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

export function FloatingNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={false}
      animate={{
        backgroundColor: scrolled ? "rgba(255,255,255,0.25)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "blur(0px)",
        width: scrolled ? "90%" : "100%",
        borderRadius: scrolled ? "9999px" : "0px",
        boxShadow: scrolled
          ? "0 8px 32px rgba(151, 205, 244, 0.27)"
          : "0 0 0 rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed top-0 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-4 text-sm font-medium text-foreground max-w-7xl"
    >
      <div className="font-bold text-lg w-1/3">TaskFlow</div>
      <div className="flex items-center w-1/4 justify-between">
        <a href="#features" className="hover:underline">
          Features
        </a>
        <a href="#pricing" className="hover:underline">
          Pricing
        </a>
        <a href="#about" className="hover:underline">
          About
        </a>
      </div>
      <div className="w-1/3 flex flex-row justify-end">
        <Button size="sm">Get Started</Button>
      </div>
    </motion.nav>
  );
}
