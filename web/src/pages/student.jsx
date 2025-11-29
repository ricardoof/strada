import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // <--- Importante
import { Check, GraduationCap, Upload, Image as ImageIcon, X, Loader2, Lock } from 'lucide-react';
import { Button } from '../components/button';
import { Input } from '../components/input';
import { InputGroup } from '../components/inputGroup';

export function Student() {
    const { user, signIn } = useAuth(); // Pega dados do usuário e função de atualizar (opcional)
    const navigate = useNavigate();

    // Estados do Formulário
    const [nome, setNome] = useState(user?.name || ''); // Já preenche se tiver logado
    const [arquivo, setArquivo] = useState(null);
    const [preview, setPreview] = useState(null);
    
    // Estados de Controle
    const [loading, setLoading] = useState(false);
    const [enviado, setEnviado] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setArquivo(file);
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
        }
    };

    const removeFile = () => {
        setArquivo(null);
        setPreview(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!nome || !arquivo) {
            alert("Por favor, preencha seu nome e envie a foto.");
            return;
        }

        setLoading(true);

        try {
            // 1. Simula o tempo de upload da imagem
            await new Promise(resolve => setTimeout(resolve, 1500));

            // 2. Chama o backend para atualizar o status do usuário
            const response = await fetch('http://localhost:3333/request-student', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id })
            });

            if (response.ok) {
                setEnviado(true);
                // Opcional: Aqui você poderia forçar um refresh no user context se tivesse essa função
                // para que o desconto apareça imediatamente sem precisar relogar.
            } else {
                alert("Erro ao enviar solicitação. Tente novamente.");
            }

        } catch (error) {
            console.error(error);
            alert("Erro de conexão.");
        } finally {
            setLoading(false);
        }
    };

    const scrollToForm = () => {
        document.getElementById('form-beneficio').scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="flex flex-col min-h-screen bg-white pt-20">
            
            {/* Hero Section */}
            <div className="bg-orange-600 text-white py-16 px-4 text-center">
                <div className="bg-white/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 backdrop-blur-sm">
                    <GraduationCap size={32} />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Estudante paga meia na Strada</h1>
                <p className="text-orange-100 text-xl max-w-2xl mx-auto mb-8">
                    Apresente sua carteirinha e garanta 50% de desconto em todas as suas viagens intermunicipais.
                </p>
                <Button 
                    onClick={scrollToForm}
                    className="bg-white text-orange-600 hover:bg-gray-100 font-bold px-8 py-6 text-lg"
                >
                    Quero meu benefício
                </Button>
            </div>

            <div className="max-w-4xl mx-auto py-16 px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
                
                {/* Lado Esquerdo */}
                <div className="space-y-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Como aproveitar?</h2>
                    <div className="space-y-6">
                        <BenefitStep number="1" text="Faça login na sua conta Strada." />
                        <BenefitStep number="2" text="Envie uma foto nítida da sua Carteira de Identificação Estudantil (CIE)." />
                        <BenefitStep number="3" text="Nosso sistema validará seus dados instantaneamente." />
                        <BenefitStep number="4" text="Pronto! O desconto será aplicado automaticamente no checkout." />
                    </div>
                </div>

                {/* Lado Direito: Formulário ou Login Block */}
                <div id="form-beneficio" className="bg-gray-50 p-8 rounded-3xl border border-gray-200 shadow-lg relative overflow-hidden">
                    
                    {/* VERIFICAÇÃO DE LOGIN */}
                    {!user ? (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-6 py-10">
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                                <Lock className="text-gray-500" size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">Identifique-se</h3>
                                <p className="text-gray-500 mt-2">Você precisa estar logado para solicitar o benefício.</p>
                            </div>
                            <Button 
                                onClick={() => navigate('/login')}
                                className="bg-orange-600 hover:bg-orange-700 text-white font-bold w-full"
                            >
                                Fazer Login
                            </Button>
                            <p className="text-sm text-gray-400">
                                Ainda não tem conta? <button onClick={() => navigate('/create-account')} className="text-orange-600 font-bold hover:underline">Cadastre-se</button>
                            </p>
                        </div>
                    ) : !enviado ? (
                        // FORMULÁRIO (Aparece só se estiver logado)
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6 animate-in fade-in">
                            <div className="text-center mb-2">
                                <h3 className="text-xl font-bold text-gray-800">Solicitar Benefício</h3>
                                <p className="text-gray-500 text-sm">Olá, <strong>{user.name}</strong>! Envie seus documentos.</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-600 ml-1">Nome Completo</label>
                                <InputGroup className="bg-white border-gray-300">
                                    <Input 
                                        placeholder="Ex: João da Silva" 
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                    />
                                </InputGroup>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-600 ml-1">Foto da Carteirinha</label>
                                
                                {!preview ? (
                                    <label className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-all group bg-white">
                                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-orange-100">
                                            <Upload className="text-gray-400 group-hover:text-orange-600" />
                                        </div>
                                        <p className="text-sm font-bold text-gray-600">Clique para enviar foto</p>
                                        <p className="text-xs text-gray-400 mt-1">JPG ou PNG (Máx. 5MB)</p>
                                        <input 
                                            type="file" 
                                            className="hidden" 
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                ) : (
                                    <div className="relative rounded-xl overflow-hidden border-2 border-orange-500 shadow-md">
                                        <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
                                        <button 
                                            type="button"
                                            onClick={removeFile}
                                            className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full text-red-500 hover:bg-white hover:scale-110 transition-all shadow-sm"
                                        >
                                            <X size={18} />
                                        </button>
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs py-1 px-3 flex items-center gap-2">
                                            <ImageIcon size={12} /> {arquivo.name}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Button 
                                type="submit"
                                width="full" 
                                className="bg-orange-600 hover:bg-orange-700 font-bold h-12 text-white disabled:opacity-70 disabled:cursor-not-allowed"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className="animate-spin" /> Processando...
                                    </span>
                                ) : (
                                    "Enviar e Ativar Desconto"
                                )}
                            </Button>
                        </form>
                    ) : (
                        // TELA DE SUCESSO
                        <div className="flex flex-col items-center justify-center h-full text-center py-10 animate-in zoom-in duration-300">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <Check size={40} className="text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Benefício Ativado!</h3>
                            <p className="text-gray-600 mb-8">
                                Sua carteirinha foi validada com sucesso. O desconto de estudante já está disponível para suas próximas compras.
                            </p>
                            <Button 
                                onClick={() => navigate('/')} 
                                className="bg-gray-800 text-white hover:bg-black"
                            >
                                Ir para Home
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

function BenefitStep({ number, text }) {
    return (
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 font-bold flex items-center justify-center text-xl shrink-0">
                {number}
            </div>
            <p className="text-gray-700 font-medium text-lg">{text}</p>
        </div>
    )
}