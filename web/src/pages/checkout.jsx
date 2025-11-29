import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Input } from '../components/input';
import { InputGroup } from '../components/inputGroup';
import { Button } from '../components/button';
import { SeatSelector } from '../components/seatSelector'; 
import { User, Mail, Phone, CreditCard, Ticket, CheckCircle, MapPin, Calendar, Info, GraduationCap } from 'lucide-react';

// --- FUNÇÕES DE MÁSCARA (HELPERS) ---
const maskCPF = (value) => {
  return value
    .replace(/\D/g, '') // Remove tudo o que não é dígito
    .replace(/(\d{3})(\d)/, '$1.$2') // Coloca ponto após o 3º digito
    .replace(/(\d{3})(\d)/, '$1.$2') // Coloca ponto após o 6º digito
    .replace(/(\d{3})(\d{1,2})/, '$1-$2') // Coloca traço após o 9º digito
    .replace(/(-\d{2})\d+?$/, '$1'); // Impede digitar mais que 11 dígitos
};

const maskPhone = (value) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2') // Coloca parênteses em volta dos dois primeiros
    .replace(/(\d{5})(\d)/, '$1-$2') // Coloca hífen entre o 5º e o 6º dígito
    .replace(/(-\d{4})\d+?$/, '$1'); // Limita o tamanho
};

export function Checkout() {
    const { id: viagemId } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [passo, setPasso] = useState(1);
    const [ocupados, setOcupados] = useState([]);
    const [selecionados, setSelecionados] = useState([]);
    const [viagem, setViagem] = useState(null);

    // Form Data
    const [nome, setNome] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [cpf, setCpf] = useState(user?.cpf || '');
    const [telefone, setTelefone] = useState(user?.telefone || '');

    const isStudent = user?.is_student === 1 || user?.is_student === true;

    useEffect(() => {
        fetch(`http://localhost:3333/viagens/${viagemId || 1}`)
            .then(res => res.json())
            .then(data => setViagem(data))
            .catch(err => console.log("Erro viagem", err));

        const fetchAssentos = () => {
            fetch(`http://localhost:3333/viagens/${viagemId || 1}/assentos`)
                .then(res => res.json())
                .then(data => setOcupados(data))
                .catch(err => console.log("Erro assentos", err));
        };
        fetchAssentos();
        const interval = setInterval(fetchAssentos, 5000); 
        return () => clearInterval(interval);
    }, [viagemId]);

    const toggleAssento = (num) => {
        if (selecionados.includes(num)) {
            setSelecionados(selecionados.filter(s => s !== num));
        } else {
            setSelecionados([...selecionados, num]); 
        }
    };

    const handleIrParaPagamento = async () => {
        if (!nome || !email || !cpf || selecionados.length === 0) {
            alert("Preencha todos os dados e selecione um assento.");
            return;
        }

        try {
            // Tenta reservar os assentos
            const res = await fetch('http://localhost:3333/reservar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    viagem_id: viagemId || 1,
                    assentos: selecionados,
                    dados_usuario: { nome, email, cpf, telefone },
                    dados_passageiro: { nome }
                })
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Erro ao reservar assentos.");
                return;
            }

            const dadosCompra = {
                viagem_id: viagemId || 1,
                assentos: selecionados,
                dados_usuario: { nome, email, cpf, telefone },
                dados_passageiro: { nome },
                viagem_detalhes: viagem,
                valores: { total, desconto, isStudent },
                reservationExpiresAt: Date.now() + (data.expiresIn || 15 * 60 * 1000) // Usa o tempo do servidor ou 15min
            };

            navigate('/cart', { state: dadosCompra });

        } catch (error) {
            console.error(error);
            alert("Erro de conexão ao tentar reservar.");
        }
    };

    // Cálculos
    const precoUnitario = viagem?.preco || 0;
    const subtotal = selecionados.length * precoUnitario;
    const desconto = isStudent ? subtotal * 0.5 : 0;
    const total = subtotal - desconto;

    if (!viagem) return <div className="p-10 text-center">Carregando...</div>;

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* ESQUERDA */}
                <div className="lg:col-span-2 space-y-6">
                    <div className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-200 transition-opacity ${passo === 2 ? 'opacity-50 pointer-events-none' : ''}`}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2"><Ticket className="text-orange-600"/> Selecione seus assentos</h2>
                            {selecionados.length > 0 && <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold">{selecionados.length} selecionado(s)</span>}
                        </div>
                        <div className={passo === 2 ? 'hidden' : 'block'}>
                             <SeatSelector occupied={ocupados} selected={selecionados} onToggle={toggleAssento} />
                        </div>
                        {passo === 2 && <div className="bg-green-50 text-green-800 p-4 rounded-lg flex items-center gap-2"><CheckCircle size={20} /><span>Assentos <strong>{selecionados.join(', ')}</strong> reservados.</span></div>}
                        {passo === 1 && selecionados.length > 0 && <div className="mt-6 flex justify-end"><Button onClick={() => setPasso(2)} className="bg-orange-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-orange-700">Continuar</Button></div>}
                    </div>

                    {passo === 2 && (
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 animate-in slide-in-from-bottom-4">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <User className="text-orange-600"/> Dados do Comprador
                        </h2>

                        {/* --- DICA DE CONTA AUTOMÁTICA --- */}
                        {!user && (
                            <div className="mb-6 bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 items-start">
                                <div className="bg-blue-100 p-2 rounded-full text-blue-600 mt-1">
                                    <Info size={20} />
                                </div>
                                <div className="text-sm text-blue-800">
                                    <p className="font-bold mb-1">Ainda não tem conta?</p>
                                    <p className="text-blue-700/80 leading-relaxed">
                                        Ao finalizar a compra, sua conta será criada <strong>automaticamente</strong>. 
                                        Enviaremos uma senha de acesso aleatória para o seu e-mail logo em seguida.
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div className="col-span-2">
                                <label className="text-sm font-bold text-gray-500 mb-1 block">Nome Completo</label>
                                <InputGroup className="bg-gray-50 border-gray-200">
                                    <User size={18} className="text-gray-400"/>
                                    <Input placeholder="Digite seu nome" value={nome} onChange={e => setNome(e.target.value)} />
                                </InputGroup>
                            </div>
                             <div className="col-span-2">
                                <label className="text-sm font-bold text-gray-500 mb-1 block">E-mail</label>
                                <InputGroup className="bg-gray-50 border-gray-200">
                                    <Mail size={18} className="text-gray-400"/>
                                    <Input placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} disabled={!!user} />
                                </InputGroup>
                            </div>
                             
                             {/* --- CAMPO CPF COM MÁSCARA --- */}
                             <div>
                                <label className="text-sm font-bold text-gray-500 mb-1 block">CPF</label>
                                <InputGroup className="bg-gray-50 border-gray-200">
                                    <CreditCard size={18} className="text-gray-400"/>
                                    <Input 
                                        placeholder="000.000.000-00" 
                                        value={cpf} 
                                        onChange={e => setCpf(maskCPF(e.target.value))} 
                                        maxLength={14}
                                    />
                                </InputGroup>
                            </div>

                             {/* --- CAMPO CELULAR COM MÁSCARA --- */}
                             <div>
                                <label className="text-sm font-bold text-gray-500 mb-1 block">Celular</label>
                                <InputGroup className="bg-gray-50 border-gray-200">
                                    <Phone size={18} className="text-gray-400"/>
                                    <Input 
                                        placeholder="(00) 00000-0000" 
                                        value={telefone} 
                                        onChange={e => setTelefone(maskPhone(e.target.value))} 
                                        maxLength={15}
                                    />
                                </InputGroup>
                            </div>
                        </div>

                        <div className="mt-6">
                            <button onClick={() => setPasso(1)} className="text-gray-500 hover:text-orange-600 underline text-sm">Voltar</button>
                        </div>
                    </div>
                    )}
                </div>

                {/* DIREITA: Resumo */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-orange-600 sticky top-24">
                        <h3 className="font-bold text-lg mb-6 text-gray-800 border-b pb-2">Resumo da Viagem</h3>
                        <div className="flex flex-col gap-4 mb-6">
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase">Origem</p>
                                <p className="font-bold">{viagem.origem}</p>
                                <p className="text-xs text-gray-400 mt-1">{viagem.local_saida}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase">Destino</p>
                                <p className="font-bold">{viagem.destino}</p>
                                <p className="text-xs text-gray-400 mt-1">{viagem.local_chegada}</p>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg mb-6 flex items-center gap-2 text-sm text-gray-600"><Calendar size={16} /><span>{new Date(viagem.data_saida).toLocaleString()}</span></div>
                        
                        <div className="space-y-3 text-sm border-t pt-4">
                             <div className="flex justify-between"><span>Assento(s)</span><span className="font-bold">{selecionados.join(', ')}</span></div>
                             <div className="flex justify-between"><span>Preço un.</span><span>R$ {precoUnitario.toFixed(2).replace('.', ',')}</span></div>
                             
                             {isStudent && (
                                <div className="flex justify-between text-green-600 bg-green-50 p-2 rounded border border-green-100">
                                    <div className="flex items-center gap-1"><GraduationCap size={16} /><span className="font-bold text-xs">Meia Estudante</span></div>
                                    <span className="font-bold">- R$ {desconto.toFixed(2).replace('.', ',')}</span>
                                </div>
                             )}
                             
                             <div className="pt-4 mt-2 border-t flex justify-between items-center"><span className="font-bold text-lg">Total</span><span className="font-bold text-2xl text-orange-600">R$ {total.toFixed(2).replace('.', ',')}</span></div>
                             
                             {passo === 2 && (
                                <Button width="full" className="bg-green-600 hover:bg-green-700 text-white font-bold h-12 mt-4 shadow-green-200 shadow-lg" onClick={handleIrParaPagamento}>
                                    Ir para Pagamento
                                </Button>
                             )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}