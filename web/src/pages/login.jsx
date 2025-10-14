import { FormLogin } from "../components/formLogin";
import { Logo } from "../components/logo";

export function Login() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="hidden lg:flex lg:justify-center lg:w-2/3 lg:items-center ">
                <img src="https://www.placecats.com/neo/300/200" alt="Logo da Strada" />
            </div>

            <div className="flex flex-col items-center justify-start lg:w-1/3">
                <Logo />
                <div className="flex flex-col w-80 rounded-2xl items-center bg-card justify-center lg:min-h-screen lg:rounded-none lg:w-full">
                    <FormLogin />

                    <div className="hidden lg:flex gap-4 p-4">
                        <p className="text-sm text-font hover:underline">Termos de uso</p>
                        <p className="text-sm text-font hover:underline">Política de privacidade</p>
                    </div>
                </div>

                <div className="flex gap-4 p-4">
                    <p className="text-sm text-font">Termos de uso</p>
                    <p className="text-sm text-font">Política de privacidade</p>
                </div>
            </div>
        </div>
    )
}