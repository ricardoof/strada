import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CreditCard as CardIcon, ArrowLeft, Lock, Check } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { ReservationTimer } from "../components/reservationTimer";

export function DebitCard() {
    const navigate = useNavigate();
    const location = useLocation();
    const { addTrip } = useAuth();
    const dadosCompra = location.state;
    const [loading, setLoading] = useState(false);

    // Estado do Cartão
    const [cardData, setCardData] = useState({
        number: '',
        name: '',
        expiry: '',
        cvv: '',
        cpf: dadosCompra?.dados_usuario?.cpf || ''
    });

    if (!dadosCompra) { navigate('/'); return null; }
    const { valores, reservationExpiresAt } = dadosCompra;

    // Máscaras (Reutilizadas para consistência)
    const handleCardInput = (field, value) => {
        let formattedValue = value;
        
        if (field === 'number') {
            formattedValue = value.replace(/\D/g, '').slice(0, 16);
            formattedValue = formattedValue.match(/.{1,4}/g)?.join(' ') || formattedValue;
        } else if (field === 'expiry') {
            formattedValue = value.replace(/\D/g, '').slice(0, 4);
            if (formattedValue.length >= 2) {
                formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2);
            }
        } else if (field === 'cvv') {
            formattedValue = value.replace(/\D/g, '').slice(0, 3);
        } else if (field === 'cpf') {
            formattedValue = value.replace(/\D/g, '').slice(0, 11);
            formattedValue = formattedValue.replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})/, '$1-$2')
                .replace(/(-\d{2})\d+?$/, '$1');
        }
        
        setCardData({ ...cardData, [field]: formattedValue });
    };

    const handleFinalizarCompra = async () => {
        if (!cardData.number || !cardData.name || !cardData.expiry || !cardData.cvv) {
            alert('Preencha todos os dados do cartão de débito.');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('http://localhost:3333/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    viagem_id: dadosCompra.viagem_id,
                    assentos: dadosCompra.assentos,
                    dados_usuario: { ...dadosCompra.dados_usuario, cpf: cardData.cpf },
                    dados_passageiro: dadosCompra.dados_passageiro
                })
            });
            
            if (res.ok) {
                addTrip({ ...dadosCompra, date: new Date().toISOString(), status: 'Pago' });
                navigate('/payment/debit-card/purchase-completed');
            } else {
                const err = await res.json();
                alert("Erro: " + (err.message || "Falha ao processar"));
            }
        } catch (error) {
            console.error(error);
            alert("Erro de conexão");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-orange-50 pt-24 pb-12 px-4 flex justify-center">
            <ReservationTimer expiresAt={reservationExpiresAt} />
            <div className="w-full max-w-2xl">
                
                <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-orange-700 hover:text-orange-800 font-bold transition-colors">
                    <ArrowLeft size={20} /> Voltar
                </button>

                <div className="bg-white rounded-3xl shadow-2xl p-8 animate-in zoom-in duration-300">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">Pagamento com Débito</h2>
                        <p className="text-gray-500">Cartão de Débito</p>
                    </div>

                    {/* --- CARTÃO VISUAL (Gradiente Amarelo/Laranja para diferenciar) --- */}
                    <div className="mb-10 perspective-1000">
                        <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all duration-500 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-white/10 to-transparent pointer-events-none"></div>
                            
                            <div className="flex justify-between items-start mb-12">
                                <div className="text-sm opacity-80 font-medium tracking-widest uppercase">Strada Débito</div>
                                <CardIcon size={40} className="opacity-80" />
                            </div>
                            <div className="mb-8">
                                <div className="font-mono text-3xl tracking-widest drop-shadow-md">
                                    {cardData.number || '•••• •••• •••• ••••'}
                                </div>
                            </div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <div className="text-[10px] opacity-80 mb-1 uppercase tracking-wider">Nome do Titular</div>
                                    <div className="font-bold text-lg tracking-wide uppercase truncate max-w-[200px]">{cardData.name || 'SEU NOME'}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] opacity-80 mb-1 uppercase tracking-wider">Validade</div>
                                    <div className="font-bold text-lg font-mono">{cardData.expiry || 'MM/AA'}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- FORMULÁRIO (Mesma estrutura moderna) --- */}
                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Número do Cartão</label>
                            <input
                                type="text"
                                value={cardData.number}
                                onChange={(e) => handleCardInput('number', e.target.value)}
                                placeholder="0000 0000 0000 0000"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none text-lg font-mono transition-colors"
                                maxLength={19}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Nome do Titular</label>
                            <input
                                type="text"
                                value={cardData.name}
                                onChange={(e) => handleCardInput('name', e.target.value.toUpperCase())}
                                placeholder="COMO ESTÁ NO CARTÃO"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none text-lg uppercase transition-colors"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Validade</label>
                                <input
                                    type="text"
                                    value={cardData.expiry}
                                    onChange={(e) => handleCardInput('expiry', e.target.value)}
                                    placeholder="MM/AA"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none text-lg font-mono text-center transition-colors"
                                    maxLength={5}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">CVV</label>
                                <input
                                    type="text"
                                    value={cardData.cvv}
                                    onChange={(e) => handleCardInput('cvv', e.target.value)}
                                    placeholder="123"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none text-lg font-mono text-center transition-colors"
                                    maxLength={3}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">CPF do Titular</label>
                            <input
                                type="text"
                                value={cardData.cpf}
                                onChange={(e) => handleCardInput('cpf', e.target.value)}
                                placeholder="000.000.000-00"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none text-lg font-mono transition-colors"
                                maxLength={14}
                            />
                        </div>

                        <div className="pt-6 border-t border-gray-100 mt-6">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-gray-500 font-medium">Total a pagar</span>
                                <span className="text-3xl font-bold text-orange-600">R$ {valores.total.toFixed(2).replace('.', ',')}</span>
                            </div>

                            <button
                                onClick={handleFinalizarCompra}
                                disabled={loading}
                                className={`w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold py-4 rounded-xl shadow-lg transform active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-wait' : ''}`}
                            >
                                {loading ? 'Processando...' : <>Pagar no Débito <Check size={20} /></>}
                            </button>
                            
                            <p className="text-xs text-center text-gray-400 mt-4 flex items-center justify-center gap-1">
                                <Lock size={12}/> Ambiente seguro criptografado
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}