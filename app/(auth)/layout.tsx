"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <section className="relative flex min-h-screen flex-row bg-linear-to-br from-blue-200 via-white to-blue-600 overflow-hidden">
      {/* Content area - full width on mobile, half width on larger screens */}
      <div className="relative z-10 w-full sm:w-1/2 min-h-screen sm:rounded-r-3xl sm:shadow-xl bg-white/70 backdrop-blur-xl border border-white/40 flex flex-col items-center justify-center">
        <div className="max-w-md w-full p-4">
          {/* <h1 className="text-6xl font-light text-primary mb-8">TaskFlow</h1> */}
          {children}
        </div>
      </div>
      {/* Background animation area - hidden on mobile, shown on larger screens */}
      <div className="hidden sm:relative sm:flex-1 sm:flex sm:items-center sm:justify-center sm:overflow-hidden">
        <motion.div
          className="absolute top-10 left-20 w-96 h-96 rounded-full bg-blue-400/20 blur-3xl"
          animate={{ x: [0, 50, -30, 0], y: [0, -40, 20, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-white/50 blur-3xl"
          animate={{ x: [0, -40, 30, 0], y: [0, 40, -30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </section>
  );
}
