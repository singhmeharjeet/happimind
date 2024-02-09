import { cn } from "@/lib/utils";
import { Dancing_Script } from "next/font/google";

import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const titleVariants = cva(
  "flex justify-center items-center text-balance text-center my-8 font-bold tracking-tighter",
  {
    variants: {
      variant: {
        underline: "underline decoration-4 underline-offset-8",
        default: "",
      },
      size: {
        default: "text-4xl",
        sm: "text-3xl",
        lg: "text-6xl",
        xl: "text-7xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const font = Dancing_Script({
  weight: ["700", "500"],
  adjustFontFallback: true,
  subsets: ["latin"],
});

export interface TitleProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof titleVariants> {}

const Title = React.forwardRef<HTMLSpanElement, TitleProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <span
        className={cn(
          font.className,
          titleVariants({ variant, size, className }),
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

export default Title;
