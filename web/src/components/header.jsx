import { useNavigate } from "react-router-dom";
import { Button } from "./button";
import { useAuth } from "../contexts/AuthContext";
import { GraduationCap, Map, LifeBuoy, User } from "lucide-react"; // Importe o User

export function Header() {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth(); // Removemos o logout daqui, vamos por na área do usuário

    return (
        <header className="flex w-full justify-between items-center px-8 py-4 bg-orange-600 shadow-md fixed top-0 z-50">
            <div className="text-white text-3xl font-bold font-logo cursor-pointer flex items-center gap-2" onClick={() => navigate('/')}>
                <h2>Strada</h2>
            </div>

            <nav className="hidden md:flex gap-6 items-center">
                <button onClick={() => navigate('/viagens')} className="flex items-center gap-2 text-white/90 hover:text-white font-medium transition-colors">
                    <Map size={18} /> Viagens
                </button>
                <button onClick={() => navigate('/estudantes')} className="flex items-center gap-2 text-white/90 hover:text-white font-medium transition-colors">
                    <GraduationCap size={18} /> Sou Estudante
                </button>
                <button onClick={() => navigate('/atendimento')} className="flex items-center gap-2 text-white/90 hover:text-white font-medium transition-colors">
                    <LifeBuoy size={18} /> Ajuda
                </button>
            </nav>

            <div className="flex gap-4">
                {isLoggedIn ? (
                    // ÍCONE DE PERFIL (Area Logada)
                    <div 
                        className="flex items-center gap-2 cursor-pointer" 
                        onClick={() => navigate('/minha-conta')}
                    >
                        <div className="w-10 h-10 rounded-full bg-white text-orange-600 flex items-center justify-center border-2 border-white/50 hover:border-white transition-all shadow-lg">
                            <User size={24} />
                        </div>
                    </div>
                ) : (
                    // Botoes normais (Deslogado)
                    <>
                        <button onClick={() => navigate('/login')} className="text-white font-medium hover:text-white/80 transition-colors">
                            Entrar
                        </button>
                        <Button onClick={() => navigate('/create-account')} className="bg-white text-orange-600 hover:bg-gray-100 font-bold">
                            Criar conta
                        </Button>
                    </>
                )}
            </div>
        </header>
    )
}