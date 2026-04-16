import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[#7B5FD4] rounded-lg",
  {
    variants: {
      variant: {
        default:     "bg-[#7B5FD4] text-[#F0E6C8] hover:bg-[#6a50ba] border border-[#7B5FD4]/50",
        destructive: "bg-[#c0392b] text-[#F0E6C8] hover:bg-[#a93226] border border-[#c0392b]/50",
        outline:     "bg-transparent text-[#F0E6C8] border border-[#7B5FD4]/50 hover:bg-[#7B5FD4]/15 hover:border-[#7B5FD4]",
        secondary:   "bg-[#3D2A8A] text-[#F0E6C8] hover:bg-[#4a35a0] border border-[#3D2A8A]/50",
        ghost:       "bg-transparent text-[#F0E6C8] hover:bg-white/8 border border-transparent",
        gold:        "bg-[#C9A84C] text-[#1B1040] hover:bg-[#d4b455] border border-[#C9A84C]/50 font-semibold",
        link:        "text-[#C9A84C] underline-offset-4 hover:underline border-none shadow-none bg-transparent",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm:      "h-8 px-3 text-xs",
        lg:      "h-11 px-8 text-base",
        icon:    "size-9",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
  );
}

export { Button, buttonVariants };
