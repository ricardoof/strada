import { cn } from "../utils";

export function Select({ className, children, ...props }) {
  return (
    <select 
      className={cn(
        "text-font w-full bg-transparent outline-none",
        "placeholder:text-font/40",
        "appearance-none",
        className
      )} 
      {...props}
    >
      {children}
    </select>
  )
}