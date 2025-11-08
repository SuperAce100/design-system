import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const loaderVariants = cva("", {
  variants: {
    variant: {
      spinner: "",
      dots: "",
      pulse: "",
    },
    size: {
      sm: "",
      default: "",
      lg: "",
    },
  },
  defaultVariants: {
    variant: "spinner",
    size: "default",
  },
});

const sizeClasses = {
  sm: {
    spinner: "size-4 border-2",
    dots: "size-1.5",
    pulse: "size-3",
  },
  default: {
    spinner: "size-6 border-2",
    dots: "size-2",
    pulse: "size-4",
  },
  lg: {
    spinner: "size-8 border-3",
    dots: "size-2.5",
    pulse: "size-6",
  },
};

interface LoaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loaderVariants> {}

function Loader({ variant = "spinner", size = "default", className, ...props }: LoaderProps) {
  const sizeConfig = sizeClasses[size || "default"];

  if (variant === "spinner") {
    return (
      <div
        data-slot="loader"
        className={cn("relative rounded-full", sizeConfig.spinner, className)}
        {...props}
      >
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "backInOut",
            repeatType: "loop",
          }}
        />
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div data-slot="loader" className={cn("flex items-center gap-1.5", className)} {...props}>
        {[0, 150, 300].map((delay, index) => (
          <motion.div
            key={index}
            className={cn("rounded-full bg-primary", sizeConfig.dots)}
            animate={{
              y: [0, -6, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay / 1000,
              repeatType: "loop",
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div
        data-slot="loader"
        className={cn("relative inline-flex items-center justify-center", className)}
        {...props}
      >
        <motion.div
          className={cn("absolute rounded-full bg-primary", sizeConfig.pulse)}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.8, 0.3, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "loop",
          }}
        />
      </div>
    );
  }

  return null;
}

export { Loader, loaderVariants };
export type { LoaderProps };
