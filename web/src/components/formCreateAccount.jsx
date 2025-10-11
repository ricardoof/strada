import { Button } from "./button";
import { Input } from "./input";

export function FormCreateAccount() {
    return (
        <div className="flex flex-col w-full gap-4 items-center justify-center p-4">
            <h2 className="text-font">Criar minha conta</h2>

            <div className="flex flex-col gap-1 w-full">
                <p className="text-font">Nome</p>
                <div className="flex gap-1 px-4 py-2 bg-input rounded">
                    <Input type="text" placeholder="Digite seu nome" />
                </div>
            </div>

            <div className="flex flex-col gap-1 w-full">
                <p className="text-font">E-mail</p>
                <div className="flex gap-1 px-4 py-2 bg-input rounded">
                    <Input type="text" placeholder="Digite seu e-mail" />
                </div>
            </div>

            <div className="flex flex-col gap-1 w-full">
                <p className="text-font">Senha</p>
                <div className="flex gap-1 px-4 py-2 bg-input rounded">
                    <Input type="password" placeholder="Digite sua senha" />
                </div>
            </div>

            <div className="w-full pt-1">
                <Button>
                    Criar conta
                </Button>
            </div>
        </div>
    )
}