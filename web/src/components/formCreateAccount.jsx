import { Input } from "./input";

export function FormCreateAccount() {
    return (
        <div className="flex flex-col w-full gap-4 items-center justify-center p-8">
            <h2>Criar minha conta</h2>

            <div className="flex flex-col gap-1 w-80">
                <p>Nome</p>
                <div className="flex gap-1 px-4 py-2 bg-gray-300 rounded">
                    <Input type="text" placeholder="Digite seu nome" />
                </div>
            </div>

            <div className="flex flex-col gap-1 w-80">
                <p>E-mail</p>
                <div className="flex gap-1 px-4 py-2 bg-gray-300 rounded">
                    <Input type="text" placeholder="Digite seu e-mail" />
                </div>
            </div>

            <div className="flex flex-col gap-1 w-80">
                <p>Senha</p>
                <div className="flex gap-1 px-4 py-2 bg-gray-300 rounded">
                    <Input type="password" placeholder="Digite sua senha" />
                </div>
            </div>
        </div>
    )
}