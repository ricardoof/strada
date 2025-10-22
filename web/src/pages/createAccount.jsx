import { FormCreateAccount } from "../components/formCreateAccount";
import { Header } from "../components/header";
import { Logo } from "../components/logo";

export function CreateAccount() {
    return (
        <div className="flex flex-col w-full min-h-screen bg-background items-center justify-start p-4">
            <Header />

            <div className="flex flex-col w-full bg-card items-center justify-center gap-4 rounded-2xl lg:w-xs">
                <FormCreateAccount />
            </div>
        </div>
    )
}