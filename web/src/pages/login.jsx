import { FormLogin } from "../components/formLogin";

export function Login() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="hidden lg:flex lg:justify-center lg:w-2/3 lg:items-center ">
                <p className="text-font text-4xl">LOGO</p>
            </div>

            <div className="flex flex-col items-center justify-center lg:w-1/3">
                <p className="flex text-font justify-center p-8 lg:hidden">LOGO</p>
                <div className="flex flex-col w-80 rounded-2xl items-center bg-card justify-center lg:min-h-screen lg:rounded-none lg:w-full">
                    <FormLogin />
                </div>
            </div>
        </div>
    )
}