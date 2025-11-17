"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";

interface FloatingInputProps extends React.ComponentProps<"input"> {
  label?: string;
  leftItem?: React.ReactNode;
  rightItem?: React.ReactNode;
  error?: string;
}

export const FloatingInput = React.forwardRef<
  HTMLInputElement,
  FloatingInputProps
>(
  (
    { label, leftItem, rightItem, className, error, type = "text", ...props },
    ref
  ) => {
    const [focused, setFocused] = React.useState(false);

    return (
      <div>
        <div className="relative w-full flex items-center">
          {leftItem && (
            <div className="absolute left-3 flex items-center justify-center text-muted-foreground">
              {leftItem}
            </div>
          )}

          <input
            ref={ref}
            type={type}
            onFocus={() => setFocused(true)}
            onBlur={(e) => setFocused(!!e.target.value)}
            className={cn(
              "peer file:text-foreground placeholder-transparent selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-12 w-full rounded-md border bg-transparent text-base shadow-xs transition-[color,box-shadow,border] outline-none disabled:pointer-events-none disabled:opacity-50 md:text-sm",
              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
              "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
              focused && "border-primary/30",
              leftItem && "pl-10",
              rightItem && "pr-10",
              className
            )}
            {...props}
          />

          {label && (
            <label
              className={cn(
                "absolute pointer-events-none px-1 rounded-sm transition-all duration-200 ease-out",
                "text-muted-foregrund",
                leftItem ? "left-10" : "left-3",
                focused || props.value
                  ? "text-xs -top-2 text-primary font-medium backdrop-blur-xl bg-white/70 dark:bg-neutral-800/60 "
                  : "text-sm top-3.5",
                (focused || props.value) && leftItem && "left-3"
              )}
            >
              {label}
            </label>
          )}

          {rightItem && (
            <div className="absolute right-3 flex items-center justify-center text-muted-foreground">
              {rightItem}
            </div>
          )}
        </div>
        <AnimatePresence mode="wait">
          {error && (
            <motion.p
              key={error} // ensures animation plays again when text changes
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="text-destructive text-xs mt-1"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

FloatingInput.displayName = "FloatingInput";
