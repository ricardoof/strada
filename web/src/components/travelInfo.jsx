import { useNavigate } from "react-router-dom";
import { Button } from "./button";

export function TravelInfo() {

    const navigate = useNavigate();

    const handleNavigateToCart = () => {
        navigate('/cart');
    }

    return (
        <div className="flex flex-col w-full gap-4 items-center justify-start lg:w-90">
            <div className="flex flex-col bg-card shadow-md w-full gap-4 items-center justify-center p-4 rounded-2xl">
                <h2 className="text-font text-2xl p-4">Detalhes da Viagem A</h2>

                <div className="flex flex-col w-full gap-4">
                    <p className="text-font p-2">Origem:</p>
                    <p className="text-font p-2">Destino:</p>
                    <p className="text-font p-2">Data:</p>
                    <p className="text-font p-2">Hora:</p>
                    <p className="text-font p-2">Nº da poltrona:</p>
                    <p className="text-font p-2">Preço:</p>
                </div>

                <div className="flex justify-center">
                    <Button 
                    variant="primary"
                    onClick={handleNavigateToCart}>
                        Comprar
                    </Button>
                </div>
            </div>
        </div>
    )
}