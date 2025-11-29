import { useState, useEffect } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ReservationTimer({ expiresAt }) {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        if (!expiresAt) return;

        const interval = setInterval(() => {
            const now = Date.now();
            const diff = expiresAt - now;

            if (diff <= 0) {
                clearInterval(interval);
                setTimeLeft(0);
                alert("Tempo de reserva esgotado! Os assentos foram liberados.");
                navigate('/'); // Redireciona para a home
            } else {
                setTimeLeft(Math.floor(diff / 1000));
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [expiresAt, navigate]);

    if (!expiresAt) return null;

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="fixed top-24 right-4 z-50 bg-white border-l-4 border-orange-600 shadow-xl rounded-lg p-4 flex items-center gap-4 animate-in slide-in-from-right duration-500">
            <div className="bg-orange-100 p-2 rounded-full text-orange-600">
                <Clock size={24} />
            </div>
            <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Reserva expira em</p>
                <p className="text-2xl font-bold text-gray-800 font-mono">
                    {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
                </p>
            </div>
        </div>
    );
}
