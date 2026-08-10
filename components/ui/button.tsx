import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[0.25rem_0.7rem_0.25rem_0.7rem] text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.985]",
  {
    variants: {
      variant: {
        default:
          "bg-foreground text-surface-0 shadow-[var(--shadow-sm)] hover:opacity-90",
        accent:
          "bg-accent text-accent-fg shadow-[var(--shadow-md)] hover:brightness-110 hover:shadow-[var(--shadow-glow)]",
        outline:
          "panel bg-surface-1 hover:border-border-strong hover:-translate-y-px hover:shadow-[var(--shadow-lg)]",
        ghost:
          "text-muted-foreground hover:bg-surface-2 hover:text-foreground",
        link: "text-accent underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-6 text-[0.9375rem]",
        icon: "size-9",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  ),
);
Button.displayName = "Button";
