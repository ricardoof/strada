import { Button } from "../components/button";
import { Input } from "../components/input";
import { useNavigate } from 'react-router-dom';
import { Logo } from "../components/logo";

export function Home() {

    const navigate = useNavigate();

    const handleNavigateToTravel = () => {
        navigate('/travel');
    }

    return (
        <div className="relative flex flex-col w-full bg-background min-h-screen gap-8 items-center justify-center p-4 lg:justify-start lg:p-8">
            <Logo />
            
            <div className="flex flex-col w-full items-start justify-center gap-8 lg:flex-row-reverse">
                <div className="flex flex-col w-full bg-card p-4 rounded-2xl items-center justify-center gap-4 lg:w-xl">
                    <h1 className="text-font text-2xl lg:text-4xl">Bem-vindo à Strada!</h1>
                    <p className="text-font text-lg lg:text-xl">Para onde vamos viajar</p>
                    <div className="flex w-full gap-1 px-4 py-2 bg-input rounded">
                        <Input type="text" placeholder="Digite seu destino" />
                    </div>
                    <div className="">
                        <Button>
                            Buscar
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col w-full bg-card p-4 rounded-2xl items-center justify-center gap-4 lg:w-xl">
                    <p className="text-font" onClick={handleNavigateToTravel}>Viagem A</p>
                    <p className="text-font">Viagem B</p>
                    <p className="text-font">Viagem C</p>
                    <p className="text-font">Viagem D</p>
                </div>
            </div>
        </div>
    )
}