import { FormCreateAccount } from "../components/formCreateAccount";
import { Header } from "../components/header";

export function CreateAccount() {
    return (
        <div className="flex flex-col w-full min-h-screen gap-20 bg-background items-center justify-start p-4">
            <Header />

            <div className="flex flex-col w-full bg-card shadow-xl items-center justify-center gap-4 rounded-2xl lg:w-md">
                <FormCreateAccount />
            </div>
        </div>
    )
}