import { useNavigate } from "react-router-dom";
import { FormLogin } from "../components/formLogin";

export function Login() {
    const navigate = useNavigate();

    const handleNavigateToHome = () => {
        navigate('/');
    }

    return (
        <div className=" flex flex-col min-h-screen gap-8 items-center justify-start bg-background p-4">
            <div className="text-font text-5xl font-bold font-logo cursor-pointer p-8"
                onClick={handleNavigateToHome}
            >
                <h1>Strada</h1>
            </div>
            <div className="flex w-80 rounded-2xl items-center bg-card shadow-xl justify-center lg:w-sm">
                <FormLogin />
            </div>

            <div className="flex gap-4 p-4">
                <p className="text-sm text-font">Termos de uso</p>
                <p className="text-sm text-font">Política de privacidade</p>
            </div>
        </div>
    )
}