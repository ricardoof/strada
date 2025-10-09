export function Input(props) {
    return (
        <input 
            className="text-black w-full bg-transparent outline-none" 
            type={props.type} 
            placeholder={props.placeholder} 
        />
    )
}