import { useNavigate } from "react-router-dom";
import { FormCreateAccount } from "../components/formCreateAccount";

export function CreateAccount() {
    const navigate = useNavigate();

    const handleNavigateToHome = () => {
        navigate('/');
    }
    
    return (
        <div className="flex flex-col w-full min-h-screen gap-8 bg-background items-center justify-start p-4">
            <div className="text-font text-5xl font-bold font-logo cursor-pointer p-8"
                onClick={handleNavigateToHome}
            >
                <h1>Strada</h1>
            </div>

            <div className="flex flex-col w-full bg-card shadow-xl items-center justify-center gap-4 rounded-2xl lg:w-md">
                <FormCreateAccount />
            </div>

            <div className="flex gap-4 p-4">
                <p className="text-sm text-font">Termos de uso</p>
                <p className="text-sm text-font">Política de privacidade</p>
            </div>
        </div>
    )
}