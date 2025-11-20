import { PaymentOption } from "./paymentOption";

export function PaymentMethods({ paymentMethod, setPaymentMethod }) {

  const handleChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <div className="flex flex-col w-full bg-card gap-4 items-center justify-center p-4 rounded-2xl shadow-xl">
      <p className="text-font text-xl">Formas de pagamento</p>

      <div className="flex flex-col w-full gap-4">
        <PaymentOption 
          label="Cartão de crédito"
          name="payment" 
          value="credit-card" 
          checked={paymentMethod === 'credit-card'} 
          onChange={handleChange} 
        />
        <PaymentOption 
          label="Cartão de débito"
          name="payment"
          value="debit-card"
          checked={paymentMethod === 'debit-card'}
          onChange={handleChange}
        />
        <PaymentOption 
          label="Boleto bancário"
          name="payment"
          value="ticket"
          checked={paymentMethod === 'ticket'}
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