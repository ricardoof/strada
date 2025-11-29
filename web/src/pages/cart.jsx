import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../components/button";
import { PaymentMethods } from "../components/paymentMethods"; // Verifique se este arquivo está enviando 'ticket'
import { Ticket, Calendar } from "lucide-react";
import { ReservationTimer } from "../components/reservationTimer";

export function Cart() {
    // Começa com pix, mas vai mudar conforme o usuário clica
    const [paymentMethod, setPaymentMethod] = useState('pix');
    const navigate = useNavigate();
    const location = useLocation();
    
    const dadosCompra = location.state;

    if (!dadosCompra) {
        return <div className="p-10 text-center">Carrinho vazio. <Button onClick={() => navigate('/')}>Voltar</Button></div>;
    }

    const { viagem_detalhes, valores, assentos, reservationExpiresAt } = dadosCompra;

    const handleContinue = () => {
        // --- CORREÇÃO DO REDIRECIONAMENTO ---
        let rotaPagamento = 'pix'; // Padrão

        if (paymentMethod === 'credit-card') rotaPagamento = 'credit-card';
        else if (paymentMethod === 'debit-card') rotaPagamento = 'debit-card';
        else if (paymentMethod === 'ticket') rotaPagamento = 'ticket'; // <--- Agora ele sabe ir para o boleto
        
        navigate(`/payment/${rotaPagamento}`, { state: dadosCompra });
    };

    // --- CORREÇÃO DO TEXTO DO BOTÃO ---
    const getButtonText = () => {
        switch (paymentMethod) {
            case 'credit-card': return 'Pagar com Crédito';
            case 'debit-card': return 'Pagar com Débito';
            case 'ticket': return 'Gerar Boleto'; // <--- Texto específico
            case 'pix': return 'Pagar com Pix';
            default: return 'Continuar';
        }
    };

    return (
        <div className="flex flex-col bg-gray-50 min-h-screen w-full items-center justify-start pt-24 pb-12 px-4 gap-8">
            <ReservationTimer expiresAt={reservationExpiresAt} />
            <h1 className="text-3xl font-bold text-gray-800">Finalizar Pagamento</h1>
            
            <div className="flex flex-col lg:flex-row gap-8 w-full max-w-5xl">
                
                {/* ESQUERDA: Resumo (Mantive igual) */}
                <div className="w-full lg:w-1/2 flex flex-col gap-4">
                    <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-orange-600">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Ticket className="text-orange-600"/> Resumo do Pedido
                        </h2>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between items-start border-b border-gray-100 pb-4">
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase">Viagem</p>
                                    <p className="font-bold text-lg">{viagem_detalhes.origem} <span className="text-gray-400">➔</span> {viagem_detalhes.destino}</p>
                                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1"><Calendar size={14}/> {new Date(viagem_detalhes.data_saida).toLocaleString()}</p>
                                </div>
                            </div>
                            
                            <div className="flex justify-between">
                                <span className="text-gray-600">Assentos selecionados</span>
                                <span className="font-bold">{assentos.join(', ')}</span>
                            </div>

                            {valores.isStudent && (
                                <div className="flex justify-between text-green-600">
                                    <span>Desconto Estudante (50%)</span>
                                    <span>- R$ {valores.desconto.toFixed(2).replace('.', ',')}</span>
                                </div>
                            )}

                            <div className="flex justify-between items-center pt-2 border-t mt-2">
                                <span className="font-bold text-lg">Total</span>
                                <span className="font-bold text-2xl text-orange-600">R$ {valores.total.toFixed(2).replace('.', ',')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* DIREITA: Métodos de Pagamento */}
                <div className="w-full lg:w-1/2 flex flex-col gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <h3 className="font-bold text-gray-800 mb-4">Escolha como pagar</h3>
                        
                        {/* Certifique-se que o componente PaymentMethods emite 'ticket' ao selecionar boleto */}
                        <PaymentMethods
                            paymentMethod={paymentMethod}
                            setPaymentMethod={setPaymentMethod}
                        />
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col gap-4 items-center text-center">
                        <div className="flex w-full justify-between items-center px-2">
                            <p className="text-gray-600">Valor a cobrar</p>
                            <p className="font-bold text-xl text-green-600">R$ {valores.total.toFixed(2).replace('.', ',')}</p>
                        </div>
                        
                        {/* Botão com texto dinâmico */}
                        <Button variant="primary" width="full" onClick={handleContinue} className="bg-orange-600 hover:bg-orange-700 h-12 font-bold text-lg">
                            {getButtonText()}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}