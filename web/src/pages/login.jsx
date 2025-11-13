import { FormLogin } from "../components/formLogin";

export function Login() {
    return (
        <div className=" flex flex-col min-h-screen gap-4 items-center justify-start bg-background p-4">
            <div className="flex w-80 rounded-2xl items-center bg-card shadow-md justify-center lg:w-sm">
                <FormLogin />
            </div>

            <div className="flex gap-4 p-4">
                <p className="text-sm text-font">Termos de uso</p>
                <p className="text-sm text-font">Política de privacidade</p>
            </div>
        </div>
    )
}