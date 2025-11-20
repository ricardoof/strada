import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Clock } from "lucide-react"; // Opcional: Ícone de relógio

export function Pix() {
    const navigate = useNavigate();
    
    const [timeLeft, setTimeLeft] = useState(25); 

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

    return (
        <div className="flex flex-col w-full gap-4 items-center justify-start p-4">
            <div className="flex flex-col w-full bg-card gap-6 items-center justify-center shadow-xl p-8 rounded-2xl lg:max-w-md text-center">
                <div>
                    <h2 className="text-font text-xl font-bold mb-2">Pagamento via Pix</h2>
                    <p className="text-font/60 text-sm">Abra o app do seu banco e escaneie o código.</p>
                </div>

                <div className="border-4 border-input p-2 rounded-xl">
                    <img 
                        src="/public/qrcode.png" 
                        alt="QR-Code Pix" 
                        className="w-48 h-48 object-contain"
                    />
                </div>

                <div className="flex flex-col items-center gap-2 bg-input/50 p-4 rounded-lg w-full">
                    <p className="text-font/80 text-sm">Aguardando pagamento...</p>
                    <div className="flex items-center gap-2 text-font font-bold text-2xl">
                        <Clock className="w-6 h-6 text-primary" />
                        <span>{formatTime(timeLeft)}</span>
                    </div>
                    <p className="text-xs text-font/40">Você será redirecionado automaticamente.</p>
                </div>
            </div>
        </div>
    )
}