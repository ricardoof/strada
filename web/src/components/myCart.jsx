import { CircleX } from "lucide-react";

export function MyCart() {
    return (
        <div className="flex flex-col w-full bg-card gap-4 items-center justify-center p-4 rounded-2xl shadow-xl">
            <div className="flex w-full justify-between">
                <p className="text-font text-xl">Viagens</p>
                <div className="flex text-xs gap-1 items-center cursor-pointer">
                    <CircleX size={12} className="text-red" />
                    <p className="text-red">Limpar carrinho</p>
                </div>
            </div>
            
            <div className="flex flex-col w-full gap-2">
                <div className="flex w-full justify-between">
                    <p className="text-font">Viagem A</p>
                    <p className="text-font">R$ 50,00</p>
                </div>
                <div className="flex w-full justify-between">
                    <p className="text-font">Viagem B</p>
                    <p className="text-font">R$ 100,00</p>
                </div>
                <div className="flex w-full justify-between">
                    <p className="text-font">Viagem C</p>
                    <p className="text-font">R$ 70,00</p>
                </div>
            </div>
        </div>
    )
}