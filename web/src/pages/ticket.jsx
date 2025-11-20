import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import { Copy, Check, Barcode } from "lucide-react"; // Ícones para visual

export function Ticket() {
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);

    // 1. Função para gerar um número de boleto aleatório formatado
    // Formato aproximado: 00000.00000 00000.00000 00000.00000 0 00000000000000
    const generateBoleto = () => {
        const r = (len) => Math.floor(Math.random() * Math.pow(10, len)).toString().padStart(len, '0');
        return `${r(5)}.${r(5)} ${r(5)}.${r(6)} ${r(5)}.${r(6)} ${r(1)} ${r(14)}`;
    };

    // Usamos useState para que o número não mude se o componente re-renderizar,
    // mas apenas quando a página for carregada pela primeira vez.
    const [boletoCode] = useState(generateBoleto());

    // 2. Calcula uma data de vencimento (3 dias a partir de hoje)
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);
    const formattedDate = expiryDate.toLocaleDateString('pt-BR');

    // 3. Função de Copiar
    const handleCopy = () => {
        navigator.clipboard.writeText(boletoCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reseta o ícone após 2s
    };

    const handleFinish = () => {
        navigate('/payment/ticket/purchase-completed'); // Reutilizando sua tela de sucesso
    };

    return (
        <div className="flex flex-col w-full gap-4 items-center justify-start p-4">
            
            <div className="flex flex-col w-full bg-card gap-6 items-center justify-center shadow-xl p-8 rounded-2xl lg:max-w-md text-center">
                
                <div>
                    <div className="flex justify-center mb-4">
                        <Barcode className="w-12 h-12 text-font" />
                    </div>
                    <h2 className="text-font text-xl font-bold mb-2">Boleto Gerado</h2>
                    <p className="text-font/60 text-sm">
                        Realize o pagamento até <strong>{formattedDate}</strong>.
                    </p>
                </div>

                <div className="w-full h-24 bg-white p-2 rounded-lg flex items-center justify-center overflow-hidden mb-4 gap-1">
                    {/* Renderiza o ícone 3 ou 4 vezes para preencher a largura */}
                    <Barcode className="w-full h-full text-black" preserveAspectRatio="none" />
                    <Barcode className="w-full h-full text-black" preserveAspectRatio="none" />
                    <Barcode className="w-full h-full text-black" preserveAspectRatio="none" />
                </div>

                <div className="flex flex-col w-full gap-2">
                    <p className="text-xs text-font/60 text-left">Linha digitável:</p>
                    <div 
                        className="flex items-center justify-between bg-input p-3 rounded-lg cursor-pointer group hover:ring-2 hover:ring-primary/50 transition-all"
                        onClick={handleCopy}
                    >
                        <span className="font-mono text-sm text-font break-all text-left">
                            {boletoCode}
                        </span>
                        <div className="pl-2 text-font/60 group-hover:text-font">
                            {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                        </div>
                    </div>
                    {copied && <p className="text-xs text-green-500">Código copiado!</p>}
                </div>

                <div className="w-full bg-input/30 p-4 rounded-lg text-left space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-font/60">Valor:</span>
                        <span className="text-font font-bold">R$ 150,00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-font/60">Vencimento:</span>
                        <span className="text-font">{formattedDate}</span>
                    </div>
                </div>

                <p className="text-xs text-font/40">
                    A confirmação do pagamento via boleto pode levar até 3 dias úteis.
                </p>

                <Button variant="primary" width="full" onClick={handleFinish}>
                    Já realizei o pagamento
                </Button>
            </div>
        </div>
    )
}