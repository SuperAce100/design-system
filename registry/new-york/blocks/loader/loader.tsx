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
    spinner: "size-8 border-[3px]",
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
        className={cn(
          "rounded-full border-4 border-primary/10 relative",
          sizeConfig.spinner,
          className
        )}
        {...props}
      >
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-primary/50"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary/30"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div data-slot="loader" className={cn("flex items-center gap-2", className)} {...props}>
        {[0, 200, 400].map((delay, index) => (
          <motion.div
            key={index}
            className={cn("rounded-full bg-primary", sizeConfig.dots)}
            animate={{
              y: [0, -8, 0],
              scale: [1, 1.1, 1],
              opacity: [1, 0.8, 1],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay / 1000,
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
        {[0, 0.2, 0.4].map((delay, index) => (
          <motion.div
            key={index}
            className={cn(
              "absolute rounded-full bg-primary",
              index === 0 ? "bg-primary" : index === 1 ? "bg-primary/80" : "bg-primary/60",
              sizeConfig.pulse
            )}
            animate={{
              scale: [1, 1.5, 2],
              opacity: [1, 0.5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeOut",
              delay,
            }}
          />
        ))}
      </div>
    );
  }

  return null;
}

export { Loader, loaderVariants };
export type { LoaderProps };
