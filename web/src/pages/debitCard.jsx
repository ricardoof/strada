import { useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { InputGroup } from "../components/inputGroup";
import { useState } from "react";
import { Select } from "../components/select";
import { ChevronDown } from "lucide-react";

export function DebitCard() {
    const navigate = useNavigate();

    const handlePurchaseCompleted = () => {
        navigate('/payment/debit-card/purchase-completed');
    }

    return (
        <div className="flex flex-col w-full bg-background gap-4 items-center justify-start p-4">
            <div className="flex flex-col w-full bg-card gap-4 items-center justify-start shadow-xl p-4 rounded-2xl lg:w-md">
                <h2 className="text-font text-xl">Informações de pagamento</h2>
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

                <div className="flex w-full gap-2 lg:flex-row">
                    <div className="flex flex-col w-16 gap-2">
                        <p>CVV:</p>
                        <InputGroup variant="primary">
                            <Input type="text" placeholder="CVV" />
                        </InputGroup>
                    </div>
                    <div className="flex flex-col gap-2 w-25">
                        <p>Exp:</p>
                        <InputGroup variant="primary">
                            <Input type="text" placeholder="MM/AA" />
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