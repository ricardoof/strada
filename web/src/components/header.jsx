import { useNavigate } from "react-router-dom";
import { Button } from "./button";

export function Header() {
    const navigate = useNavigate();

    const handleNavigateToHome = () => {
        navigate('/');
    }

    const handleNavigateToLogin = () => {
        navigate('/login');
    }

    const handleNavigateToCreateAccount = () => {
        navigate('/create-account');
    }

    return (
        <header className="flex w-full justify-between items-center p-4">
            <div className="w-20 p-4" onClick={handleNavigateToHome}>
                <img src="https://www.placecats.com/neo/300/200" alt="Logo da Strada" />
            </div>

            <div className="flex gap-4 justify-between">

                <Button onClick={handleNavigateToLogin}>
                    Entrar
                </Button>

                <Button onClick={handleNavigateToCreateAccount}>
                    Criar conta
                </Button>
            </div>
        </header>
    )
}