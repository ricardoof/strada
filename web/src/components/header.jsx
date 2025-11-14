import { useNavigate } from "react-router-dom";
import { Button } from "./button";
import { useAuth } from "../contexts/AuthContext";

export function Header() {
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useAuth();

    const handleNavigateToHome = () => {
        navigate('/');
    }

    const handleNavigateToLogin = () => {
        navigate('/login');
    }

    const handleNavigateToCreateAccount = () => {
        navigate('/create-account');
    }

    const handleLogout = () => {
        logout();
    }

    return (
        <header className="flex w-full justify-between items-center p-4">
            <div className="text-font text-3xl font-bold font-logo cursor-pointer" onClick={handleNavigateToHome}>
                <h2>Strada</h2>
            </div>

            <div className="flex gap-4">
                {isLoggedIn ? (
                    <Button onClick={handleLogout}>
                        Sair
                    </Button>
                ) : (
                    <>
                        <Button onClick={handleNavigateToLogin}>
                            Entrar
                        </Button>
                        <Button onClick={handleNavigateToCreateAccount}>
                            Criar conta
                        </Button>
                    </>
                )}
            </div>
        </header>
    )
}