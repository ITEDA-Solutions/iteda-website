import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      default: "bg-primary text-white hover:bg-primary-dark shadow-sm",
      outline:
        "border-2 border-primary bg-white hover:bg-primary/5 text-primary",
      ghost: "hover:bg-primary/5 text-primary",
      link: "text-primary underline-offset-4 hover:underline",
    };

    const sizes = {
      default: "h-10 px-6 py-2",
      sm: "h-9 rounded-md px-3 text-sm",
      lg: "h-12 rounded-md px-8 text-lg",
    };

    if (asChild) {
      return (
        <span
          className={cn(
            baseStyles,
            variants[variant],
            sizes[size],
            className
          )}
        >
          {children}
        </span>
      );
    }

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };