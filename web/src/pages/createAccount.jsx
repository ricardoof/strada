import { FormCreateAccount } from "../components/formCreateAccount";
import { Logo } from "../components/logo";

export function CreateAccount() {
    return (
        <div className="flex flex-col w-screen h-screen bg-background items-center justify-center p-4">
            <Logo />

            <div className="flex flex-col w-full bg-card items-center justify-center gap-4 rounded-2xl lg:w-xs">
                <FormCreateAccount />
            </div>
        </div>
    )
}