import { Header } from "../components/header";
import { MyCart } from "../components/myCart";
import { PaymentMethods } from "../components/paymentMethods";

export function Cart() {
    return (
        <div className="flex flex-colflex flex-col bg-background min-h-screen w-full items-center justify-start p-4 gap-4">
            <Header />
            <h2 className="text-font">Meu carrinho</h2>
            <MyCart />
            <PaymentMethods />
        </div>
    )
}