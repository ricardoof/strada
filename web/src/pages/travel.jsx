import { Bus } from "../components/bus";
import { Logo } from "../components/logo";
import { TravelInfo } from "../components/travelInfo";

export function Travel() {
    return (
        <div className="flex flex-col bg-background min-h-screen w-full items-center justify-start p-4 gap-4">
            <Logo />

            <div className="flex flex-col gap-4 lg:flex-row">
                <Bus />
                <TravelInfo />
            </div>
        </div>
    )
}