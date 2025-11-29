import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { InputGroup } from "./inputGroup";

export function FormCreateAccount() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        if (!name || !email || !password) {
            alert("Preencha todos os campos!");
            return;
        }

        try {
            // MUDANÇA: Não enviamos mais o is_student aqui
            const response = await fetch('http://localhost:3333/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }) 
            });

            const data = await response.json();

            if (response.ok) {
                alert("Conta criada com sucesso! Faça login para continuar.");
                navigate('/login');
            } else {
                alert(data.error || "Erro ao criar conta");
            }

        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro ao conectar com o servidor.");
        }
    }

    return (
        <div className="flex flex-col w-full gap-5 items-center justify-center p-6 md:p-8">
            <div className="text-center mb-2">
                <h2 className="text-2xl font-bold text-gray-800">Crie sua conta</h2>
                <p className="text-gray-500 text-sm">Comece a viajar com a Strada hoje mesmo.</p>
            </div>

            {/* Nome */}
            <div className="flex flex-col gap-1 w-full">
                <label className="text-sm font-bold text-gray-600">Nome completo</label>
                <InputGroup className="bg-gray-50 border border-gray-200">
                    <User className="text-orange-500 w-5 h-5" />
                    <Input 
                        type="text" 
                        placeholder="Digite seu nome" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </InputGroup>
            </div>

            {/* E-mail */}
            <div className="flex flex-col gap-1 w-full">
                <label className="text-sm font-bold text-gray-600">E-mail</label>
                <InputGroup className="bg-gray-50 border border-gray-200">
                    <Mail className="text-orange-500 w-5 h-5" />
                    <Input 
                        type="email" 
                        placeholder="seu@email.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </InputGroup>
            </div>

            {/* Senha */}
            <div className="flex flex-col gap-1 w-full">
                <label className="text-sm font-bold text-gray-600">Senha</label>
                <InputGroup className="bg-gray-50 border border-gray-200">
                    <Lock className="text-orange-500 w-5 h-5" />
                    <Input 
                        type="password" 
                        placeholder="Crie uma senha forte" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </InputGroup>
            </div>

            <div className="w-full mt-2">
                <Button 
                    width="full" 
                    className="bg-orange-600 hover:bg-orange-700 font-bold h-12 text-lg shadow-lg hover:shadow-orange-500/30 transition-all"
                    onClick={handleRegister}
                >
                    Cadastrar <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
            </div>
            
            <p className="text-sm text-gray-500">
                Já tem uma conta? <span className="text-orange-600 font-bold cursor-pointer hover:underline" onClick={() => navigate('/login')}>Fazer login</span>
            </p>
        </div>
    )
}