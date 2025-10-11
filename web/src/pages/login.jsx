import { FormLogin } from "../components/formLogin";

export function Login() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="hidden lg:block lg:w-2/3">

            </div>
            <div className="flex flex-col w-80 rounded-2xl items-center bg-card justify-center lg:w-1/3 lg:min-h-screen lg:rounded-none">
                <FormLogin />
            </div>
        </div>
    )
}