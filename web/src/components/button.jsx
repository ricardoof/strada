import { cva } from "class-variance-authority";
import { cn } from "../utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium px-4 py-2 cursor-pointer transition-all duration-200 ease-in-out hover:brightness-90",
  {
    variants: {
      variant: {
        default: "bg-button text-white",
        primary: "bg-button-primary text-font",
      },
      width: {
        content: "",
        full: "w-full",
      },
      justify: {
        center: "justify-center",
        between: "justify-between",
      },
    },
    defaultVariants: {
      variant: "default",
      width: "content",
      justify: "center",
    },
  }
);

export function Button({ className, variant, width, justify, children, ...props }) {
  return (
    <button
      className={cn(buttonVariants({ variant, width, justify, className }))}
      {...props}
    >
        {children}
    </button>
  );
}