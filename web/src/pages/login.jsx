import { FormLogin } from "../components/formLogin";

export function Login() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950">
            <div className="hidden lg:block lg:w-2/3">

            </div>
            <div className="w-full lg:w-1/3">
                <FormLogin />
            </div>
        </div>
    )
}