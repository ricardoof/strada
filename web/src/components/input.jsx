export function Input({ type, placeholder, ...props }) {
    return (
        <input 
            className="text-font w-full bg-transparent outline-none placeholder:text-font/40" 
            type={type} 
            placeholder={placeholder} 
            {...props}
        />
    )
}