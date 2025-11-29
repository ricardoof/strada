import { useState } from 'react';
import { Mail, LockKeyhole, ArrowRight } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';
import { useNavigate } from 'react-router-dom';
import { InputGroup } from './inputGroup';
import { useAuth } from '../contexts/AuthContext';

export function FormLogin() {
    const { login } = useAuth();
    const navigate = useNavigate();

    // Estados para guardar o que o usuário digita
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginSubmit = async () => {
        if (!email || !password) {
            alert("Preencha e-mail e senha!");
            return;
        }

        try {
            // Chamada para a rota de login que acabamos de criar
            const response = await fetch('http://localhost:3333/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Sucesso!
                // Chama a função login do seu Contexto para salvar o estado globalmente
                login(data.user); 
                navigate('/'); // Redireciona para a Home
            } else {
                // Erro (Senha errada ou usuário não existe)
                alert(data.error || "Erro ao fazer login");
            }

        } catch (error) {
            console.error("Erro ao conectar com servidor", error);
            alert("Servidor indisponível.");
        }
    }

    return (
        <div className="flex flex-col w-full gap-5 items-center justify-center p-6 md:p-8">
            <div className="text-center mb-2">
                <p className="text-xl font-bold text-gray-800 lg:text-2xl">Acesse sua conta</p>
                <p className="text-gray-500 text-sm">Bem-vindo de volta!</p>
            </div>

            {/* Campo E-mail */}
            <div className="flex flex-col gap-1 w-full">
                <p className="text-sm font-bold text-gray-600 lg:text-base">E-mail</p>
                <InputGroup className="bg-gray-50 border border-gray-200"> 
                    <Mail className="text-orange-500 w-5 h-5" />
                    <Input 
                        type="email" 
                        placeholder="Digite seu e-mail" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </InputGroup>
            </div>

            {/* Campo Senha */}
            <div className="flex flex-col gap-1 w-full">
                <p className="text-sm font-bold text-gray-600 lg:text-base">Senha</p>
                <InputGroup className="bg-gray-50 border border-gray-200">
                    <LockKeyhole className="text-orange-500 w-5 h-5" />
                    <Input 
                        type="password" 
                        placeholder="Digite sua senha" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </InputGroup>
            </div>

            {/* Botão de Ação */}
            <div className="w-full mt-2">
                <Button 
                    justify="between" 
                    width="full" 
                    className="bg-orange-600 hover:bg-orange-700 font-bold h-12 text-lg shadow-lg hover:shadow-orange-500/30 transition-all"
                    onClick={handleLoginSubmit}
                >
                    Acessar
                    <ArrowRight className="w-5 h-5" />
                </Button>
            </div>

            {/* Link para criar conta se não tiver */}
            <p className="text-sm text-gray-500 mt-2">
                Ainda não tem conta? <span className="text-orange-600 font-bold cursor-pointer hover:underline" onClick={() => navigate('/create-account')}>Cadastre-se</span>
            </p>

        </div>
    )
}