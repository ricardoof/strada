import { useState, useEffect } from 'react';
import { Search, MapPin, DollarSign, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { RouteCard } from '../components/routeCard';
import { Input } from '../components/input';
import { InputGroup } from '../components/inputGroup';
import { Button } from '../components/button';

export function AllDestinations() {
    
    const [destinos, setDestinos] = useState([]);

    // ESTADOS DOS FILTROS
    const [filtroOrigem, setFiltroOrigem] = useState('');
    const [filtroDestino, setFiltroDestino] = useState('');
    const [filtroPreco, setFiltroPreco] = useState('');

    // ESTADOS DA PAGINAÇÃO
    const [pagina, setPagina] = useState(1);
    const ITENS_POR_PAGINA = 50;

    // Função que busca os dados no banco
    // Aceita uma página opcional (se não passar, usa a página 1)
    const buscarDestinos = (paginaAtual = 1) => {
        const params = new URLSearchParams();
        
        // Filtros
        if (filtroOrigem) params.append('origem', filtroOrigem);
        if (filtroDestino) params.append('destino', filtroDestino);
        if (filtroPreco) params.append('maxPreco', filtroPreco);

        // Paginação (Envia para o servidor)
        params.append('_page', paginaAtual);
        params.append('_limit', ITENS_POR_PAGINA);

        fetch(`http://localhost:3333/destinos?${params.toString()}`)
            .then(response => response.json())
            .then(data => {
                setDestinos(data);
                // Scroll suave para o topo ao trocar de página
                window.scrollTo({ top: 0, behavior: 'smooth' });
            })
            .catch(error => console.error("Erro:", error));
    }

    // Busca inicial
    useEffect(() => {
        buscarDestinos(1);
    }, []);

    // Ação do Botão Filtrar
    const handleFiltrar = () => {
        // Quando filtramos, é importante voltar para a página 1
        setPagina(1); 
        buscarDestinos(1);
    }

    // Funções de Navegação
    const proximaPagina = () => {
        // Se a lista atual for menor que o limite, significa que acabaram os dados
        if (destinos.length < ITENS_POR_PAGINA) return; 

        const novaPagina = pagina + 1;
        setPagina(novaPagina);
        buscarDestinos(novaPagina);
    }

    const paginaAnterior = () => {
        if (pagina === 1) return;

        const novaPagina = pagina - 1;
        setPagina(novaPagina);
        buscarDestinos(novaPagina);
    }

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

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 pt-24 pb-12 px-4">
            <div className="max-w-7xl mx-auto w-full">
                
                <div className="flex flex-col gap-2 mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Todos os destinos</h1>
                    <p className="text-gray-500">Encontre a viagem perfeita para o seu bolso.</p>
                </div>

                {/* --- BARRA DE FILTROS AVANÇADA --- */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-12">
                    <div className="flex items-center gap-2 mb-4 text-orange-600 font-bold">
                        <Filter size={20} />
                        <h2>Filtrar viagens</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Saindo de</label>
                            <InputGroup className="bg-gray-50 border border-gray-200">
                                <MapPin className="text-gray-400 w-4 h-4" />
                                <Input 
                                    placeholder="Ex: São Paulo" 
                                    value={filtroOrigem}
                                    onChange={(e) => setFiltroOrigem(e.target.value)}
                                />
                            </InputGroup>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Indo para</label>
                            <InputGroup className="bg-gray-50 border border-gray-200">
                                <MapPin className="text-gray-400 w-4 h-4" />
                                <Input 
                                    placeholder="Ex: Rio de Janeiro" 
                                    value={filtroDestino}
                                    onChange={(e) => setFiltroDestino(e.target.value)}
                                />
                            </InputGroup>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Preço Máximo</label>
                            <InputGroup className="bg-gray-50 border border-gray-200">
                                <DollarSign className="text-gray-400 w-4 h-4" />
                                <Input 
                                    type="number"
                                    placeholder="Ex: 100" 
                                    value={filtroPreco}
                                    onChange={(e) => setFiltroPreco(e.target.value)}
                                />
                            </InputGroup>
                        </div>

                        <div>
                            {/* Alterado para chamar handleFiltrar */}
                            <Button 
                                width="full" 
                                className="h-[42px] bg-orange-600 hover:bg-orange-700 font-bold"
                                onClick={handleFiltrar} 
                            >
                                <Search size={18} className="mr-2" /> Filtrar
                            </Button>
                        </div>
                    </div>
                </div>

                {/* --- RESULTADOS --- */}
                {destinos.length === 0 ? (
                    <div className="text-center py-20 opacity-50">
                        <p className="text-xl font-bold">Nenhum destino encontrado.</p>
                        {pagina > 1 && <Button onClick={paginaAnterior} className="mt-4 bg-gray-500">Voltar página</Button>}
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                            {destinos.map(item => (
                                <RouteCard 
                                    key={item.id}
                                    id={item.id}
                                    origin={item.origem} 
                                    destination={item.destino}
                                    local_saida={item.local_saida}
                                    local_chegada={item.local_chegada}
                                    data_saida={item.data_saida}
                                    price={item.preco ? item.preco.toFixed(2).replace('.', ',') : '0,00'}
                                    image={getCityImage(item.destino)}
                                />
                            ))}
                        </div>

                        {/* --- PAGINAÇÃO --- */}
                        <div className="flex items-center justify-center gap-4 py-8 border-t border-gray-200">
                            <Button 
                                onClick={paginaAnterior} 
                                disabled={pagina === 1}
                                className={`flex items-center gap-2 px-6 ${pagina === 1 ? 'bg-gray-300 cursor-not-allowed opacity-50' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                            >
                                <ChevronLeft size={16} /> Anterior
                            </Button>

                            <span className="font-bold text-gray-700">
                                Página {pagina}
                            </span>

                            <Button 
                                onClick={proximaPagina}
                                disabled={destinos.length < ITENS_POR_PAGINA}
                                className={`flex items-center gap-2 px-6 ${destinos.length < ITENS_POR_PAGINA ? 'bg-gray-300 cursor-not-allowed opacity-50' : 'bg-orange-600 text-white hover:bg-orange-700'}`}
                            >
                                Próxima <ChevronRight size={16} />
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}