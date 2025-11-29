import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { QrCode, Copy, Clock, CheckCircle } from "lucide-react";
import { Button } from "../components/button";
import { useAuth } from "../contexts/AuthContext";
import { ReservationTimer } from "../components/reservationTimer";

export function Pix() {
    const navigate = useNavigate();
    const location = useLocation();
    const { addTrip } = useAuth();
    const dadosCompra = location.state; // Recebe os dados do carrinho
    const [loading, setLoading] = useState(false);

    // Tempo para redirecionamento automático
    const [timeLeft, setTimeLeft] = useState(30*10); 

    // Se não tiver dados da compra, volta para a home
    if (!dadosCompra) {
        setTimeout(() => navigate('/'), 3000);
        return <div className="p-10 text-center text-orange-600 font-bold">Erro: Nenhuma compra selecionada. Redirecionando...</div>;
    }

    const { valores, reservationExpiresAt } = dadosCompra;
    // Gera um código PIX "Copia e Cola" fictício para demonstração
    const pixCopiaECola = `00020126580014br.gov.bcb.pix0136TXID${Date.now()}520400005303986540${valores.total.toFixed(2)}5802BR5925STRADA TRANSPORTES6009SAO PAULO62070503***6304`;

    const handleJaPaguei = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:3333/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    viagem_id: dadosCompra.viagem_id,
                    assentos: dadosCompra.assentos,
                    dados_usuario: dadosCompra.dados_usuario,
                    dados_passageiro: dadosCompra.dados_passageiro
                })
            });

            if (res.ok) {
                addTrip({ ...dadosCompra, date: new Date().toISOString(), status: 'Pago' });
                navigate('/');
            } else {
                const err = await res.json();
                alert("Erro: " + (err.message || "Falha ao processar pagamento."));
            }
        } catch (error) {
            console.error(error);
            alert("Erro de conexão");
        } finally {
            setLoading(false);
        }
    };

    // Timer para redirecionar para a tela de sucesso
    useEffect(() => {
        if (timeLeft === 0) {
            navigate('/payment/pix/purchase-completed'); 
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, navigate]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const copyPixCode = () => {
        navigator.clipboard.writeText(pixCopiaECola);
        alert('Código PIX copiado!');
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 pt-24 pb-12 px-4 items-center justify-center">
            <ReservationTimer expiresAt={reservationExpiresAt} />
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 animate-in fade-in zoom-in duration-300">
                
                {/* Cabeçalho */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <QrCode className="text-orange-600" size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Pagamento via Pix</h2>
                    <p className="text-gray-500">
                        Abra o app do seu banco e escaneie o QR Code abaixo.
                    </p>
                </div>

                {/* Valor a Pagar */}
                <div className="bg-orange-50 border border-orange-100 p-6 rounded-2xl text-center mb-8">
                    <p className="text-gray-600 mb-1">Valor total a pagar</p>
                    <p className="text-4xl font-bold text-orange-600">
                        R$ {valores.total.toFixed(2).replace('.', ',')}
                    </p>
                </div>

                {/* QR Code Realista */}
                <div className="flex justify-center mb-8">
                    <div className="p-4 border-4 border-orange-600 rounded-2xl">
                        <img 
                            src="/qrcode.png"  // Use a imagem do QR Code real
                            alt="QR Code Pix" 
                            className="w-48 h-48 object-contain"
                        />
                    </div>
                </div>

                {/* Pix Copia e Cola */}
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 mb-8">
                    <p className="text-xs text-gray-600 font-bold uppercase mb-2">Pix Copia e Cola</p>
                    <div className="bg-white p-3 rounded-lg border border-gray-100 font-mono text-xs text-gray-500 break-all mb-3 shadow-inner">
                        {pixCopiaECola}
                    </div>
                    <button 
                        onClick={copyPixCode} 
                        className="w-full flex items-center justify-center gap-2 bg-orange-600 text-white font-bold py-3 rounded-lg hover:bg-orange-700 transition-all active:scale-95"
                    >
                        <Copy size={18} /> Copiar Código
                    </button>
                </div>

                {/* Timer de Redirecionamento */}
                <div className="flex flex-col items-center gap-2 bg-blue-50 p-4 rounded-xl w-full border border-blue-100">
                    <div className="flex items-center gap-2 text-blue-800 font-bold text-xl">
                        <Clock className="w-6 h-6" />
                        <span>Aguardando pagamento... {formatTime(timeLeft)}</span>
                    </div>
                    <p className="text-xs text-blue-600/80">Você será redirecionado automaticamente após o pagamento.</p>
                </div>

                <Button 
                    onClick={handleJaPaguei} 
                    disabled={loading}
                    className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white"
                >
                    <CheckCircle className="mr-2" size={20} />
                    {loading ? 'Processando...' : 'Já paguei'}
                </Button>
            </div>
        </div>
    )
}