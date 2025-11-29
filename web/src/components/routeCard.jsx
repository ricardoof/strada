import { MapPin, ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export function RouteCard({ id, origin, destination, price, image, data_saida }) {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all group h-full flex flex-col border border-gray-100">
            {/* Imagem do Destino */}
            <div className="h-48 overflow-hidden relative">
                <img 
                    src={image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800"} 
                    alt={destination} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                <div className="absolute bottom-3 left-3 text-white">
                    <p className="text-[10px] font-bold opacity-90 uppercase tracking-wider mb-1">Indo para</p>
                    <h3 className="text-xl font-bold leading-none">{destination}</h3>
                </div>
            </div>

            {/* Conteúdo do Card */}
            <div className="p-4 flex flex-col flex-1 justify-between">
                <div className="space-y-3">
                    {/* Origem */}
                    <div className="flex items-center gap-2 text-gray-600">
                        <MapPin size={16} className="text-orange-500 shrink-0" />
                        <span className="text-sm font-medium truncate">Saindo de {origin}</span>
                    </div>

                    {/* Data (Só mostra se for passada) */}
                    {data_saida && (
                        <div className="flex items-center gap-2 text-gray-500">
                            <Calendar size={16} className="text-orange-400 shrink-0" />
                            <span className="text-xs font-medium">
                                {new Date(data_saida).toLocaleDateString('pt-BR')} • {new Date(data_saida).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}
                            </span>
                        </div>
                    )}
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-400 font-bold uppercase">A partir de</p>
                        <p className="text-lg font-bold text-gray-800">
                            <span className="text-sm font-normal mr-1">R$</span>
                            {price}
                        </p>
                    </div>
                    
                    {/* AQUI ESTÁ A MÁGICA DO LINK */}
                    <Link 
                        to={`/checkout/${id}`} 
                        className="bg-orange-50 text-orange-600 w-10 h-10 rounded-full flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all shadow-sm hover:shadow-orange-200"
                        title="Comprar passagem"
                    >
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </div>
    )
}