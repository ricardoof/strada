export function Button({children, ...props}) {
    return (
        <button className="flex bg-button text-font px-4 py-2 w-full justify-between rounded-xl cursor-pointer text-sm md:text-xl" {...props}>
            {children}
        </button>
    )
}