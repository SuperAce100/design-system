import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const cardVariants = cva("text-card-foreground rounded-2xl p-6 flex flex-col gap-2", {
  variants: {
    variant: {
      default: "bg-card border border-border shadow-md shadow-shade",
      raised: "bg-card border border-border shadow-xl shadow-shade -translate-y-0.5",
      flat: "bg-muted",
      outline: "border border-border",
      fancy_light:
        "border border-primary/30 bg-transparent bg-radial-[at_70%_25%] from-transparent to-primary/20 shadow-lg inset-shadow-sm shadow-shade inset-shadow-white/80 transition-all duration-200 hover:bg-primary/10",
      double:
        "border border-border shadow-md shadow-shade relative bg-secondary/30 backdrop-blur-sm",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, variant, ...props }, ref) =>
  variant === "double" ? (
    <div className={cn(cardVariants({ variant, className }))}>
      <div
        ref={ref}
        className=" absolute inset-2 p-4 border border-border rounded-lg bg-card shadow-lg shadow-shade flex flex-col gap-2"
        {...props}
      />
    </div>
  ) : (
    <div ref={ref} className={cn(cardVariants({ variant, className }))} {...props} />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1.5 place-self-start", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("font-medium text-2xl leading-none tracking-tight font-heading", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-muted-foreground", className)} {...props} />
  )
);
CardDescription.displayName = "CardDescription";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center gap-2 place-self-end", className)} {...props} />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription };
