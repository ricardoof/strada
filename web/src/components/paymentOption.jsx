import { cva } from "class-variance-authority";
import { cn } from "../utils";

const paymentVariants = cva(
  "flex items-center w-full p-4 rounded-lg cursor-pointer transition-all bg-input",
  {
    variants: {
      isSelected: {
        true: "ring-2 ring-white/50",
        false: "opacity-70 hover:opacity-100",
      },
    },
  }
);

function RadioDot({ isSelected }) {
  return (
    <div className="w-5 h-5 rounded-full border-2 border-font/50 flex items-center justify-center mr-3">
      {isSelected && <div className="w-3 h-3 rounded-full bg-font" />}
    </div>
  );
}

export function PaymentOption({ className, isSelected, label, ...props }) {
  return (
    <div
      className={cn(paymentVariants({ isSelected, className }))}
      {...props}
    >
      <RadioDot isSelected={isSelected} />
      <span className="text-font">{label}</span>
    </div>
  );
}