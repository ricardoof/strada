import { Check, ArrowRight } from "lucide-react";
import { Button } from "../components/button";
import { useNavigate } from "react-router-dom";

export function PurchaseCompleted() {
    const navigate = useNavigate();
    
    return (
        <div className="flex flex-col min-h-screen bg-green-50 w-full items-center justify-center p-4">
            <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-md w-full animate-in zoom-in duration-300">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={40} className="text-green-600" strokeWidth={3} />
                </div>
                
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Sucesso!</h2>
                <p className="text-gray-500 mb-8">
                    Sua viagem está garantida. Enviamos os detalhes e as passagens para o seu e-mail.
                </p>

                <div className="space-y-3">
                    <Button 
                        variant="primary" 
                        width="full" 
                        className="bg-gray-800 hover:bg-black font-bold"
                        onClick={() => navigate('/minha-conta')}
                    >
                        Ver minhas passagens
                    </Button>
                    <Button 
                        variant="outline" 
                        width="full"
                        onClick={() => navigate('/')}
                        className="border-gray-200 hover:bg-gray-50 text-gray-600"
                    >
                        Voltar para o início
                    </Button>
                </div>
            </div>
        </div>
    )
}