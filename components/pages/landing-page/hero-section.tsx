"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { GetStartedButton } from "./get-started-button";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const words = ["Teams", "Projects", "Automation", "Productivity"];
  const [index, setIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-linear-to-br from-blue-50 via-white to-blue-100 text-center">
      <motion.div
        className="absolute top-10 left-10 w-80 h-80 rounded-full bg-blue-300/40 blur-3xl"
        animate={{ x: [0, 60, -40, 0], y: [0, -40, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-blue-300/40 blur-2xl"
        animate={{ x: [0, -40, 20, 0], y: [0, 50, -30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-2xl px-6">
        <h1 className="text-6xl md:text-7xl font-extrabold leading-tight mb-6">
          Streamline your{" "}
          <span className="relative inline-flex items-center justify-center">
            {/* This container locks the width */}
            <span className="relative block h-[1.2em] w-[9ch] overflow-hidden text-blue-600 drop-shadow-sm text-center">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={words[index]}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  className="absolute left-0 right-0"
                >
                  {words[index]}
                </motion.span>
              </AnimatePresence>
            </span>
          </span>{" "}
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          The modern workspace for managing tasks, tracking goals, and
          automating workflows.
        </p>

        <Button
          size="lg"
          onClick={() => router.push("/login")}
          className="rounded-full px-8 py-6 text-base shadow-lg"
        >
          Get Started
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}
