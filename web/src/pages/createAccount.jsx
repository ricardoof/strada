import { Button } from "../components/button";
import { FormCreateAccount } from "../components/formCreateAccount";

export function CreateAccount() {
    return (
        <div className="flex flex-col w-screen h-screen bg-background items-center justify-center p-4">
            <div className="flex flex-col w-full bg-card items-center justify-center gap-4 rounded-2xl lg:w-xl">
                <FormCreateAccount />
            </div>
        </div>
    )
}