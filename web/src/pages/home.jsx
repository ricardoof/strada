import { Button } from "../components/button";
import { Input } from "../components/input";
import { useNavigate } from 'react-router-dom';
import { Header } from "../components/header";
import { InputGroup } from "../components/inputGroup";
import { useState } from "react";

export function Home() {

    const navigate = useNavigate();

    const handleNavigateToTravel = () => {
        navigate('/travel');
    }

    const [showResults, setShowResults] = useState(false);

    const handleSearch = () => {
        // aqui também faria a busca de dados
        setShowResults(true);
    }

    return (
        <div className="relative flex flex-col w-full bg-background min-h-screen gap-4 items-center justify-start p-4">
            <Header />
            
            <div className="flex flex-col w-full items-center justify-center gap-8">
                <div className="flex flex-col w-full bg-card shadow-xl p-4 rounded-2xl items-center justify-center gap-4 lg:w-xl">
                    <h1 className="text-font text-2xl lg:text-4xl">Bem-vindo à Strada!</h1>
                    <p className="text-font text-lg lg:text-xl">Para onde vamos viajar</p>
                    
                    <InputGroup variant="primary">
                        <Input type="text" placeholder="Digite seu destino" />
                    </InputGroup>

                    <div className="">
                        <Button variant="primary" onClick={handleSearch}>
                            Buscar
                        </Button>
                    </div>
                </div>

                {showResults && (
                    <div className="flex flex-col w-full bg-card shadow-xl p-4 rounded-2xl items-center justify-center gap-4 lg:w-xl">
                        <p className="text-font" onClick={handleNavigateToTravel}>Viagem A</p>
                        <p className="text-font">Viagem B</p>
                        <p className="text-font">Viagem C</p>
                        <p className="text-font">Viagem D</p>
                    </div>
                )}
            </div>
        </div>
    )
}