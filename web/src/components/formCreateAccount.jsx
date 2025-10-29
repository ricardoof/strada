import { useNavigate } from "react-router-dom";
import { Button } from "./button";
import { Input } from "./input";
import { InputGroup } from "./inputGroup";

export function FormCreateAccount() {

    const navigate = useNavigate();

    const handleNavigateToHome = () => {
        navigate('/');
    }

    return (
        <div className="flex flex-col w-full gap-4 items-center justify-center p-4">
            <h2 className="text-font lg:text-2xl">Criar minha conta</h2>

            <div className="flex flex-col gap-1 w-full">
                <p className="text-font">Nome</p>
                <InputGroup>
                    <Input type="text" placeholder="Digite seu nome" />
                </InputGroup>
            </div>

            <div className="flex flex-col gap-1 w-full">
                <p className="text-font">E-mail</p>
                <InputGroup>
                    <Input type="text" placeholder="Digite seu e-mail" />
                </InputGroup>
            </div>

            <div className="flex flex-col gap-1 w-full">
                <p className="text-font">Senha</p>
                <InputGroup>
                    <Input type="password" placeholder="Digite sua senha" />
                </InputGroup>
            </div>

            <div className="">
                <Button onClick={handleNavigateToHome}>
                    Criar conta
                </Button>
            </div>
        </div>
    )
}