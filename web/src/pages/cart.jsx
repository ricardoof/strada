import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import { Header } from "../components/header";
import { MyCart } from "../components/myCart";
import { PaymentMethods } from "../components/paymentMethods";

export function Cart() {
    const [paymentMethod, setPaymentMethod] = useState('pix');
    const navigate = useNavigate();

    const handleContinue = () => {
        navigate(`/payment/${paymentMethod}`);
    };

    return (
        <div className="flex flex-col bg-background min-h-screen w-full items-center justify-start p-4 gap-4">
            <Header />
            <div>
                <h2 className="text-font">Meu carrinho</h2>
                <Button variant="primary">
                    Continuar comprando
                </Button>
            </div>
            <div className="flex flex-col w-full items-center justify-start gap-4 lg:flex-row lg:items-start">  
                <div className="flex flex-col w-full items-center lg:w-1/2">
                    
                    <MyCart />
                </div>
                <div className="flex flex-col w-full items-center gap-4 lg:w-1/2">
                    <PaymentMethods
                        paymentMethod={paymentMethod}
                        setPaymentMethod={setPaymentMethod}
                    />

                    <div className="flex flex-col w-full bg-card gap-4 items-center justify-center p-4 rounded-2xl">
                        <div className="flex w-full items-center justify-between">
                            <p className="text-font text-xs">Total a pagar:</p>
                            <p className="text-font font-bold text-lg">R$ 150,00</p>
                        </div>
                        <Button variant="primary" onClick={handleContinue}>
                            Continuar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}