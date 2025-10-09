import { Button } from "../components/button";
import { FormCreateAccount } from "../components/formCreateAccount";

export function CreateAccount() {
    return (
        <div className="flex flex-col w-screen h-screen gap-4 items-center justify-center p-8 rounded-3xl">
            <div className="flex flex-col w-xl bg-gray-800 items-center justify-center gap-4">
                <FormCreateAccount />

            <Button>
                Criar minha conta
            </Button>
            </div>
        </div>
    )
}