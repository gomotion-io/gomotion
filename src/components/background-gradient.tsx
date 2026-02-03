import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React from "react";

// Gradient color palette – tweak these values to adjust the gradient theme in one place
const GRADIENT_COLORS = {
  teal: "#00ccb1",
  purple: "#7b61ff",
  yellow: "#ffc414",
  blue: "#1ca0fb",
  dark: "#141316",
} as const;

// CSS variables map derived from GRADIENT_COLORS
const GRADIENT_CSS_VARS = {
  "--color-teal": GRADIENT_COLORS.teal,
  "--color-purple": GRADIENT_COLORS.purple,
  "--color-yellow": GRADIENT_COLORS.yellow,
  "--color-blue": GRADIENT_COLORS.blue,
  "--color-dark": GRADIENT_COLORS.dark,
} as React.CSSProperties;

// Static Tailwind class using CSS vars (keeps Tailwind JIT happy while enabling runtime color tweaks)
const GRADIENT_BG_CLASS =
  "bg-[radial-gradient(circle_farthest-side_at_0_100%,var(--color-teal),transparent),radial-gradient(circle_farthest-side_at_100%_0,var(--color-purple),transparent),radial-gradient(circle_farthest-side_at_100%_100%,var(--color-yellow),transparent),radial-gradient(circle_farthest-side_at_0_0,var(--color-blue),var(--color-dark))]";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <div className={cn("relative p-[4px] group", containerClassName)}>
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
          ...GRADIENT_CSS_VARS,
        }}
        className={cn(
          "absolute inset-0 rounded-[28px] z-[1] opacity-60 group-hover:opacity-100 blur-2xl  transition duration-500 will-change-transform",
          GRADIENT_BG_CLASS
        )}
      />
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
          ...GRADIENT_CSS_VARS,
        }}
        className={cn(
          "absolute inset-0 rounded-[28px] z-[1] will-change-transform",
          GRADIENT_BG_CLASS
        )}
      />

      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};
