import { useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { InputGroup } from "../components/inputGroup";
import { useState } from "react";
import { Select } from "../components/select";
import { ChevronDown } from "lucide-react";

export function CreditCard() {
    const navigate = useNavigate();

    const handlePurchaseCompleted = () => {
        navigate('/payment/credit-card/purchase-completed');
    }

    const [installment, setInstallment] = useState("");

    const installmentOptions = [
        { value: 1, label: "1x de R$ 150,00" },
        { value: 2, label: "2x de R$ 75,00" },
        { value: 3, label: "3x de R$ 50,00" },
    ];

    return (
        <div className="flex flex-col w-full bg-background min-h-screen gap-4 items-center justify-start p-4">
            <div className="flex flex-col w-full bg-card gap-4 items-center justify-start shadow-xl p-4 rounded-2xl lg:w-md">
                <h2>Informações de pagamento</h2>
                <div className="flex flex-col w-full gap-2">
                    <p>Número do cartão:</p>
                    <InputGroup variant="primary">
                        <Input type="text" placeholder="Número do cartão" />
                    </InputGroup>
                </div>

                <div className="flex flex-col w-full gap-2">
                    <p>Nome no cartão:</p>
                    <InputGroup variant="primary">
                        <Input type="text" placeholder="Nome no cartão" />
                    </InputGroup>
                </div>

                <div className="flex flex-col w-full gap-2 lg:flex-row">
                    <div className="flex flex-col gap-2 w-1/6">
                        <p>CVV:</p>
                        <InputGroup variant="primary">
                            <Input type="text" placeholder="CVV" />
                        </InputGroup>
                    </div>
                    <div className="flex flex-col gap-2 w-2/6">
                        <p>Exp:</p>
                        <InputGroup variant="primary">
                            <Input type="text" placeholder="MM/AA" />
                        </InputGroup>
                    </div>
                    <div className="flex flex-col gap-2 w-3/6">
                        <p>Nº de parcelas:</p>
                        <InputGroup variant="primary" className="relative">
                            <Select 
                                value={installment}
                                onChange={(e) => setInstallment(e.target.value)}
                            >
                                <option value="" disabled>Selecione</option>
                                
                                {installmentOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </Select>
                            <ChevronDown 
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-font/60 pointer-events-none" 
                            />
                        </InputGroup>
                    </div>
                </div>

                <Button
                    variant="primary"
                    width="full"
                    onClick={handlePurchaseCompleted}
                >
                    Finalizar compra
                </Button>
            </div>
        </div>
    )
}