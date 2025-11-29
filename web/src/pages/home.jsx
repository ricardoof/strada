import { useState } from 'react'; // <--- Importe o useState
import { MapPin, Calendar, Users, ArrowRight, Star, ShieldCheck, Smartphone } from 'lucide-react'; 
import { Button } from '../components/button';
import { Input } from '../components/input';
import { InputGroup } from '../components/inputGroup';
import { FeatureItem } from '../components/feature_Item';
import busBg from '../images/Strada_bus.png'
import { RouteCard } from '../components/routeCard';
import { useNavigate } from "react-router-dom";

export function Home() {
    const navigate = useNavigate();

    // Mapeamento de extensões especiais (o padrão é .jpg)
    const imageExtensions = {
        'bauru': 'jpeg',
        'careiro': 'jpeg',
        'iranduba': 'png',
        'mazagao': 'png',
        'mojui dos campos': 'png',
        'mucajai': 'png',
        'pacaraima': 'png',
        'ponta pora': 'png',
        'sao borja': 'png',
        'vitoria do xingu': 'png'
    };

    const getCityImage = (cityName) => {
        if (!cityName) return null;
        // Normaliza: minúsculo e remove acentos
        const normalized = cityName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const extension = imageExtensions[normalized] || 'jpg';
        return `/cidades/${normalized}.${extension}`;
    };

    // --- ESTADOS DO FORMULÁRIO ---
    const [tipoViagem, setTipoViagem] = useState('ida'); // 'ida' ou 'idaVolta'
    const [origem, setOrigem] = useState('');
    const [destino, setDestino] = useState('');
    const [dataIda, setDataIda] = useState('');
    const [dataVolta, setDataVolta] = useState('');

    // --- FUNÇÃO DE BUSCA ---
    const handleBuscar = async () => {
        // 1. Validação básica
        if (!origem || !destino || !dataIda) {
            alert("Por favor, preencha a origem, destino e data de ida.");
            return;
        }

        if (tipoViagem === 'idaVolta' && !dataVolta) {
            alert("Por favor, selecione a data de volta.");
            return;
        }

        try {
            // 2. Busca no Backend (usando a rota de destinos que já criamos)
            const params = new URLSearchParams({
                origem: origem,
                destino: destino
            });

            const response = await fetch(`http://localhost:3333/destinos?${params.toString()}`);
            const viagens = await response.json();

            // 3. Filtrar pela DATA exata (já que o backend busca string parcial no banco)
            // O input date retorna "YYYY-MM-DD", o banco tem "YYYY-MM-DD HH:MM" ou parecido
            const viagemEncontrada = viagens.find(v => v.data_saida && v.data_saida.startsWith(dataIda));

            if (viagemEncontrada) {
                // SUCESSO: Vai direto para o checkout da viagem encontrada
                navigate(`/checkout/${viagemEncontrada.id}`);
            } else {
                // FALHA
                alert(`Não encontramos passagens de ${origem} para ${destino} na data ${dataIda}. Tente outra data!`);
            }

        } catch (error) {
            console.error("Erro na busca:", error);
            alert("Erro ao conectar com o servidor.");
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
          
          {/* 1. HERO SECTION */}
          <div 
            className="relative w-full h-[600px] flex flex-col items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${busBg})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent"></div>
    
            <div className="z-10 w-full max-w-6xl px-4 flex flex-col gap-4 mt-10 text-center md:text-left">
                <span className="text-orange-400 font-bold tracking-widest uppercase text-sm md:text-base animate-pulse">
                    Viaje com segurança e economia
                </span>
                <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-xl leading-tight max-w-3xl">
                    O Brasil espera por você. <br />
                    Vá de <span className="text-orange-500 bg-white/90 px-3 rounded-lg skew-x-[-10deg] inline-block">Strada</span>
                </h1>
                <p className="text-gray-200 text-lg md:text-xl max-w-xl drop-shadow-md">
                    Mais de 500 destinos com o conforto que você merece e preços que cabem no bolso.
                </p>
            </div>
          </div>
    
          {/* 2. BARRA DE BUSCA (FUNCIONAL) */}
          <div className="w-full px-4 -mt-32 z-20 mb-16">
            <div className="max-w-6xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-2xl border-b-4 border-orange-600">
                
                {/* Opções de Viagem (Radio Buttons Controlados) */}
                <div className="flex gap-8 mb-6 border-b border-gray-100 pb-4">
                    {/* Botão SÓ IDA */}
                    <label 
                        className="flex items-center gap-2 cursor-pointer group"
                        onClick={() => setTipoViagem('ida')}
                    >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
                            ${tipoViagem === 'ida' ? 'border-orange-600' : 'border-gray-300 group-hover:border-orange-500'}`}>
                            {tipoViagem === 'ida' && <div className="w-2.5 h-2.5 rounded-full bg-orange-600"></div>}
                        </div>
                        <span className={`font-bold transition-colors ${tipoViagem === 'ida' ? 'text-gray-800' : 'text-gray-500 group-hover:text-orange-600'}`}>
                            Só ida
                        </span>
                    </label>

                    {/* Botão IDA E VOLTA */}
                    <label 
                        className="flex items-center gap-2 cursor-pointer group"
                        onClick={() => setTipoViagem('idaVolta')}
                    >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
                            ${tipoViagem === 'idaVolta' ? 'border-orange-600' : 'border-gray-300 group-hover:border-orange-500'}`}>
                             {tipoViagem === 'idaVolta' && <div className="w-2.5 h-2.5 rounded-full bg-orange-600"></div>}
                        </div>
                        <span className={`font-bold transition-colors ${tipoViagem === 'idaVolta' ? 'text-gray-800' : 'text-gray-500 group-hover:text-orange-600'}`}>
                            Ida e volta
                        </span>
                    </label>
                </div>
    
                {/* Inputs Dinâmicos */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                    
                    {/* Origem (Sempre 3 colunas) */}
                    <div className="md:col-span-3">
                        <p className="text-xs text-gray-500 font-bold mb-1 ml-1 uppercase tracking-wide">De</p>
                        <InputGroup className="bg-gray-50 border border-gray-200 h-12">
                            <MapPin className="text-orange-500 w-5 h-5" />
                            <Input 
                                type="text" 
                                placeholder="Cidade de origem" 
                                value={origem}
                                onChange={(e) => setOrigem(e.target.value)}
                            />
                        </InputGroup>
                    </div>
    
                    {/* Destino (Sempre 3 colunas) */}
                    <div className="md:col-span-3">
                        <p className="text-xs text-gray-500 font-bold mb-1 ml-1 uppercase tracking-wide">Para</p>
                        <InputGroup className="bg-gray-50 border border-gray-200 h-12">
                            <MapPin className="text-gray-400 w-5 h-5" />
                            <Input 
                                type="text" 
                                placeholder="Cidade de destino" 
                                value={destino}
                                onChange={(e) => setDestino(e.target.value)}
                            />
                        </InputGroup>
                    </div>
    
                    {/* DATAS (Layout muda dependendo se é ida ou ida/volta) */}
                    
                    {/* Data de IDA */}
                    <div className={tipoViagem === 'ida' ? "md:col-span-3" : "md:col-span-2"}>
                        <p className="text-xs text-gray-500 font-bold mb-1 ml-1 uppercase tracking-wide">
                            {tipoViagem === 'ida' ? 'Data da viagem' : 'Data de Ida'}
                        </p>
                        <InputGroup className="bg-gray-50 border border-gray-200 h-12">
                            <Calendar className="text-gray-400 w-5 h-5" />
                            <Input 
                                type="date" 
                                className="bg-transparent text-gray-600 w-full uppercase text-sm"
                                value={dataIda}
                                onChange={(e) => setDataIda(e.target.value)}
                            />
                        </InputGroup>
                    </div>

                    {/* Data de VOLTA (Só aparece se selecionado) */}
                    {tipoViagem === 'idaVolta' && (
                        <div className="md:col-span-2 animate-in fade-in slide-in-from-left-4 duration-300">
                            <p className="text-xs text-gray-500 font-bold mb-1 ml-1 uppercase tracking-wide">Data de Volta</p>
                            <InputGroup className="bg-gray-50 border border-gray-200 h-12">
                                <Calendar className="text-orange-400 w-5 h-5" />
                                <Input 
                                    type="date" 
                                    className="bg-transparent text-gray-600 w-full uppercase text-sm"
                                    value={dataVolta}
                                    onChange={(e) => setDataVolta(e.target.value)}
                                />
                            </InputGroup>
                        </div>
                    )}
    
                    {/* Botão (Largura ajustável para fechar o grid de 12 colunas) */}
                    <div className={tipoViagem === 'ida' ? "md:col-span-3" : "md:col-span-2"}>
                        <Button 
                            width="full" 
                            className="bg-orange-600 hover:bg-orange-700 text-white font-bold h-12 text-lg shadow-lg hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1"
                            onClick={handleBuscar}
                        >
                            BUSCAR
                        </Button>
                    </div>
                </div>
            </div>
          </div>
    
          {/* 3. DESTINOS POPULARES */}
          <section className="w-full max-w-6xl mx-auto px-4 mb-20">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Nossas rotas mais populares</h2>
                    <p className="text-gray-500 mt-2">Os trechos mais buscados da semana.</p>
                </div>
                
                <button 
                    onClick={() => navigate('/destinos')}
                    className="text-orange-600 font-bold hover:underline hidden md:flex items-center gap-1"
                >
                    Ver todos os destinos <ArrowRight size={16} />
                </button>
            </div>
    
            {/* Grid com RouteCards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <RouteCard
                    id={71} 
                    origin="São Paulo"
                    destination="Rio de Janeiro"
                    price="89,90"
                    image={getCityImage("Rio de Janeiro")}
                />
                <RouteCard
                    id={72} 
                    origin="Belo Horizonte"
                    destination="Salvador"
                    price="132,83"
                    image={getCityImage("Salvador")}
                />
                <RouteCard
                    id={73} 
                    origin="Salvador"
                    destination="Feira de Santana"
                    price="33,06"
                    image={getCityImage("Feira de Santana")}
                />
                <RouteCard
                    id={74} 
                    origin="Natal"
                    destination="Recife"
                    price="49,90"
                    image={getCityImage("Recife")}
                />
            </div>
            
            <div className="mt-8 text-center md:hidden">
                <Button variant="primary" width="full" onClick={() => navigate('/destinos')}>
                    Ver todos os destinos
                </Button>
            </div>
          </section>
    
          {/* 4. BANNER PROMOCIONAL / APP */}
          <section className="w-full bg-gray-900 py-16 mb-16 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-600/10 skew-x-12 transform translate-x-20"></div>
            
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between relative z-10 gap-10">
                <div className="text-white md:w-1/2">
                    <div className="inline-block bg-orange-500 text-xs font-bold px-2 py-1 rounded mb-4">NOVIDADE</div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Baixe o App da Strada</h2>
                    <p className="text-gray-400 mb-8 text-lg">
                        Compre passagens mais rápido, acompanhe sua viagem em tempo real e ganhe descontos exclusivos na primeira compra.
                    </p>
                    <div className="flex gap-4">
                        <Button className="bg-white text-black hover:bg-gray-200 border-0 flex gap-2">
                            <Smartphone size={20} /> App Store
                        </Button>
                        <Button className="bg-transparent border border-white/30 text-white hover:bg-white/10 flex gap-2">
                            <Smartphone size={20} /> Google Play
                        </Button>
                    </div>
                </div>
                
                <div className="hidden md:flex justify-center md:w-1/2">
                     <div className="w-64 h-96 bg-gray-800 rounded-3xl border-8 border-gray-700 shadow-2xl flex items-center justify-center transform rotate-6 hover:rotate-0 transition-all duration-500">
                        <span className="text-orange-500 font-logo text-4xl font-bold">Strada</span>
                     </div>
                </div>
            </div>
          </section>
    
          {/* 5. VANTAGENS */}
          <div className="w-full bg-white py-16">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-center text-2xl font-bold text-gray-800 mb-12">Por que viajar com a gente?</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureItem 
                        icon={<Users className="w-8 h-8 text-orange-600" />}
                        title="Conforto Premium"
                        desc="Poltronas semi-leito e leito com Wi-Fi gratuito e entradas USB."
                    />
                    <FeatureItem 
                        icon={<ShieldCheck className="w-8 h-8 text-orange-600" />}
                        title="Segurança Total"
                        desc="Frota monitorada 24h por satélite e motoristas certificados."
                    />
                    <FeatureItem 
                        icon={<Star className="w-8 h-8 text-orange-600" />}
                        title="Melhores Avaliações"
                        desc="Somos a empresa com a melhor nota de satisfação do mercado."
                    />
                </div>
            </div>
          </div>
    
        </div>
      );
}