import { cva } from "class-variance-authority";
import { cn } from "../utils";

const inputGroupVariants = cva(
  [
    "flex items-center gap-2 w-full rounded-lg px-4 py-2",
    "bg-input",
    "border border-transparent",
    "transition-all duration-200 ease-in-out",
    "focus-within:ring-2"
  ],
  {
    variants: {
      variant: {
        primary: "focus-within:ring-button-primary/70", 
        default: "focus-within:ring-button/70"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export function InputGroup({ className, variant, children }) {
  return (
    <div className={cn(inputGroupVariants({ variant, className }))}>
      {children}
    </div>
  );
}