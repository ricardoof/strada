import { Bus } from "../components/bus";
import { Header } from "../components/header";
import { TravelInfo } from "../components/travelInfo";

export function Travel() {
    return (
        <div className="flex flex-col bg-background min-h-screen w-full items-center justify-start p-4 gap-4">
            <Header />

            <div className="flex flex-col gap-8 lg:flex-row lg:gap-32">
                <Bus />
                <TravelInfo />
            </div>
        </div>
    )
}