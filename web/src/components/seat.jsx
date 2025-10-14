import { cva } from "class-variance-authority";
import { cn } from "../utils";

const seatVariants = cva(
  "flex items-center justify-center text-font rounded-md w-15 h-15 cursor-pointer",
  {
    variants: {
      status: {
        available: "bg-green",
        occupied: "bg-red",
      },
    },
    defaultVariants: {
      status: "available",
    },
  }
);

export function Seat({className, children, status, ...props}) {
    return (
        <div className={cn(seatVariants({status, className}))} {...props}>
            {children}
        </div>
    )
}