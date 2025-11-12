import { cn } from "../utils";

export function PaymentOption({ className, label, name, value, checked, onChange, ...props }) {
  const inputId = `payment-${value}`; 

  return (
    <label
      htmlFor={inputId}
      className={cn("cursor-pointer", className)}
      {...props}
    >
      <input 
        id={inputId} 
        type="radio" 
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />

      <div className={cn(
        "flex items-center w-full p-4 rounded-md transition-all duration-200 bg-input ring-2",
        checked ? "ring-[var(--color-button-primary)]" : "ring-transparent"
      )}>
        <div className={cn(
          "w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 transition-colors duration-200",
          checked ? "border-font" : "border-font/50"
        )}>
          {checked && (
            <div className="w-3 h-3 rounded-full bg-font" />
          )}
        </div>
        
        <span className="text-font">
          {label}
        </span>
      </div>
    </label>
  );
}