import { useState } from "react";
import { PaymentOption } from "./paymentOption";

export function PaymentMethods() {

    const [paymentMethod, setPaymentMethod] = useState('');

    return (
        <div className="flex flex-col w-full bg-card gap-4 items-center justify-center p-4 rounded-2xl">
            <p className="text-font text-xs">Formas de pagamento</p>

            <div className="flex flex-col w-full gap-4">
                <PaymentOption 
                    label="Cartão de crédito"
                    isSelected={paymentMethod === 'credit_card'}
                    onClick={() => setPaymentMethod('credit_card')}
                />

                <PaymentOption 
                    label="Cartão de débito"
                    isSelected={paymentMethod === 'debit_card'}
                    onClick={() => setPaymentMethod('debit_card')}
                />

                <PaymentOption 
                    label="Boleto bancário"
                    isSelected={paymentMethod === 'boleto'}
                    onClick={() => setPaymentMethod('boleto')}
                />

                <PaymentOption 
                    label="Pix"
                    isSelected={paymentMethod === 'pix'}
                    onClick={() => setPaymentMethod('pix')}
                />
            </div>
        </div>
    )
}