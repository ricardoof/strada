import { Mail, LockKeyhole, ArrowRight } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';
import { useNavigate } from 'react-router-dom';
import { InputGroup } from './inputGroup';
import { useAuth } from '../contexts/AuthContext';

export function FormLogin() {
    const { login } = useAuth();

    const handleLoginSubmit = () => {
        // (Aqui você validaria o e-mail e a senha)
        
        // Se a validação for OK:
        login();
    }

    const navigate = useNavigate();

    const handleNavigateToCreateAccount = () => {
        navigate('/create-account');
    }

    const handleNavigateToHome = () => {
        navigate('/');
    }

    return (
        <div className="flex flex-col w-full gap-4 items-center justify-center p-4">
            <p className="text-lg text-font lg:text-2xl">Acesse sua conta</p>

            <div className="flex flex-col gap-1 w-full">
                <p className="text-sm text-font lg:text-lg">E-mail</p>
                <InputGroup> 
                    <Mail className="text-font/50" />
                    <Input type="text" placeholder="Digite seu e-mail" />
                </InputGroup>
            </div>

            <div className="flex flex-col gap-1 w-full">
                <p className="text-sm text-font lg:text-lg">Senha</p>
                <InputGroup>
                    <LockKeyhole className="text-font/50" />
                    <Input 
                        type="password" 
                        placeholder="Digite sua senha" 
                    />
                </InputGroup>
            </div>

            <div className="w-full">
                <Button justify="between" width="full" onClick={handleLoginSubmit}>
                    Acessar
                    <ArrowRight />
                </Button>
            </div>

        </div>
    )
}