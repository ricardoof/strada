import { Check } from "lucide-react";

export function PurchaseCompleted() {
    return (
        <div className="flex flex-col bg-background w-full items-center justify-center p-4 gap-4">
            <div className="flex flex-col bg-card w-70 items-center justify-center p-4 gap-4 rounded-2xl shadow-xl">
                <h2 className="text-font text-2xl">Compra concluída!</h2>
                <Check size={64} className="text-green" />
            </div>
        </div>
    )
}