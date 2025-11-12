import { PaymentOption } from "./paymentOption";

export function PaymentMethods({ paymentMethod, setPaymentMethod }) {

  const handleChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <div className="flex flex-col w-full bg-card gap-4 items-center justify-center p-4 rounded-2xl">
      <p className="text-font text-md">Formas de pagamento</p>

      <div className="flex flex-col w-full gap-4">
        <PaymentOption 
          label="Cartão de crédito"
          name="payment" 
          value="credit_card" 
          checked={paymentMethod === 'credit_card'} 
          onChange={handleChange} 
        />
        <PaymentOption 
          label="Cartão de débito"
          name="payment"
          value="debit_card"
          checked={paymentMethod === 'debit_card'}
          onChange={handleChange}
        />
        <PaymentOption 
          label="Boleto bancário"
          name="payment"
          value="boleto"
          checked={paymentMethod === 'boleto'}
          onChange={handleChange}
        />
        <PaymentOption 
          label="Pix"
          name="payment"
          value="pix"
          checked={paymentMethod === 'pix'}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}