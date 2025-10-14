import { Mail, LockKeyhole, ArrowRight } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';
import { useNavigate } from 'react-router-dom';

export function FormLogin() {

    const navigate = useNavigate();

    const handleNavigateToCreateAccount = () => {
        navigate('/create-account');
    }

    const handleNavigateToHome = () => {
        navigate('/home');
    }

    return (
        <div className="flex flex-col w-full gap-4 items-center justify-center p-4">
            <p className="text-lg text-font lg:text-2xl">Acesse sua conta</p>

            <div className="flex flex-col gap-1 w-full lg:w-90">
                <p className="text-sm text-font lg:text-xl">E-mail</p>
                <div className="flex gap-1 px-4 py-2 bg-input rounded lg:w-90">
                    <Mail className="text-font" />
                    <Input type="text" placeholder="Digite seu e-mail" />
                </div>
            </div>

            <div className="flex flex-col gap-1 w-full lg:w-90">
                <p className="text-sm text-font lg:text-xl">Senha</p>
                <div className="flex gap-1 px-4 py-2 bg-input rounded lg:w-90">
                    <LockKeyhole className="text-font" />
                    <Input 
                        type="password" 
                        placeholder="Digite sua senha" 
                    />
                </div>
            </div>

            <div className="w-full lg:w-90">
                <Button onClick={handleNavigateToHome}>
                    Acessar
                    <ArrowRight />
                </Button>
            </div>

            <p className="text-sm text-font">Não tem uma conta?</p>

            <div className="w-full lg:w-90">
                <Button onClick={handleNavigateToCreateAccount}>
                    Criar conta
                    <ArrowRight />
                </Button>
            </div>

        </div>
    )
}