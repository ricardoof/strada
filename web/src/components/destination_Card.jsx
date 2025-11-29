import { ArrowRight } from 'lucide-react';

export function DestinationCard({ city, price, img }) {
    return (
        <div className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300">
            {/* Imagem de Fundo */}
            <img src={img} alt={city} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            
            {/* Overlay Gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            
            {/* Conteúdo */}
            <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                <h3 className="text-2xl font-bold mb-1">{city}</h3>
                <p className="text-sm text-gray-300">A partir de</p>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-orange-400 font-bold bg-orange-500/20 px-2 py-1 rounded">PROMO</span>
                    <span className="text-2xl font-bold text-orange-400">R$ {price}</span>
                </div>
            </div>

            {/* Botão flutuante que aparece no hover */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                <div className="bg-white text-orange-600 p-2 rounded-full shadow-lg">
                    <ArrowRight size={20} />
                </div>
            </div>
        </div>
    )
}