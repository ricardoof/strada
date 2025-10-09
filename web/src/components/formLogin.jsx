import { Mail, LockKeyhole, ArrowRight } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';
import { useNavigate } from 'react-router-dom';

export function FormLogin() {

    const navigate = useNavigate();

    const handleNavigateToCreateAccount = () => {
        navigate('/create-account');
    }

    return (
        <div className="flex flex-col gap-4 bg-gray-900 min-h-screen items-center justify-center p-8">
            <p className="text-lg lg:text-2xl">Acesse sua conta</p>

            <div className="flex flex-col gap-1">
                <p className="text-sm lg:text-xl">E-mail</p>
                <div className="flex gap-1 px-4 py-2 bg-gray-300 rounded w-60 lg:w-90">
                    <Mail className="text-black" />
                    <Input type="text" placeholder="Digite seu e-mail" />
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <p className="text-sm lg:text-xl">Senha</p>
                <div className="flex gap-1 px-4 py-2 bg-gray-300 rounded w-60 lg:w-90">
                    <LockKeyhole className="text-black" />
                    <Input 
                        type="password" 
                        placeholder="Digite sua senha" 
                    />
                </div>
            </div>

            <div className="w-60 lg:w-90">
                <Button>
                    Acessar
                    <ArrowRight />
                </Button>
            </div>

            <p className="text-sm">Não tem uma conta?</p>

            <div className="w-60 lg:w-90">
                <Button onClick={handleNavigateToCreateAccount}>
                    Criar conta
                    <ArrowRight />
                </Button>
            </div>

        </div>
    )
}