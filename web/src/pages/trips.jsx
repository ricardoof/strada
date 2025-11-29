import { useState, useEffect } from 'react';
import { MapPin, Search, ArrowRight, Navigation } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Configuração do ícone laranja
const orangeIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Dicionário de coordenadas
const cityCoords = {
  "Belo Horizonte": { lat: -19.9167, lng: -43.9345 },
  "Rio de Janeiro": { lat: -22.9068, lng: -43.1729 },
  "Porto Alegre": { lat: -30.0346, lng: -51.2177 },
  "São Paulo": { lat: -23.5505, lng: -46.6333 },
  "Salvador": { lat: -12.9777, lng: -38.5016 },
  "Fortaleza": { lat: -3.7172, lng: -38.5434 },
  "Brasília": { lat: -15.7801, lng: -47.9292 },
  "Curitiba": { lat: -25.4284, lng: -49.2733 },
  "Recife": { lat: -8.0476, lng: -34.8770 },
  "Manaus": { lat: -3.1019, lng: -60.0250 },
  "Natal": { lat: -5.7945, lng: -35.2110 },
  "Vitória": { lat: -20.3155, lng: -40.3128 },
  "Feira de Santana": { lat: -12.2733, lng: -38.9556 },
};

// Componente Zoom Control
function ZoomControl() {
  const map = useMap();
  return (
    <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
      <button onClick={() => map.zoomIn()} className="bg-white hover:bg-gray-50 text-gray-700 font-bold w-10 h-10 rounded-lg shadow-lg border-2 border-gray-200 transition-all hover:scale-105 flex items-center justify-center">+</button>
      <button onClick={() => map.zoomOut()} className="bg-white hover:bg-gray-50 text-gray-700 font-bold w-10 h-10 rounded-lg shadow-lg border-2 border-gray-200 transition-all hover:scale-105 flex items-center justify-center">−</button>
    </div>
  );
}

// Componente AutoFitBounds
function AutoFitBounds({ markers }) {
  const map = useMap();
  useEffect(() => {
    if (markers.length > 0) {
      const bounds = L.latLngBounds(markers.map(m => [m.lat, m.lng]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 7, animate: true, duration: 1 });
    }
  }, [markers, map]);
  return null;
}

// --- ATENÇÃO AQUI: EXPORT FUNCTION ---
export function Trips() { 
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [destinos, setDestinos] = useState([]); 
  const [filteredDestinos, setFilteredDestinos] = useState([]);
  const [selectedDestino, setSelectedDestino] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3333/destinos')
        .then(res => res.json())
        .then(data => {
            setDestinos(data);
            setFilteredDestinos(data);
        })
        .catch(err => console.error("Erro API:", err));
  }, []);

  useEffect(() => {
    const results = destinos.filter(d => 
      d.destino.toLowerCase().includes(search.toLowerCase()) ||
      d.origem.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredDestinos(results);
  }, [search, destinos]);

  const markers = filteredDestinos.map(v => cityCoords[v.destino]).filter(Boolean);
  const handleBuy = (id) => navigate(`/checkout/${id}`);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/30 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <MapPin className="text-orange-600" size={40}/>
              Explore nossos destinos
            </h1>
            <p className="text-gray-600 text-lg">Veja no mapa as rotas disponíveis e garanta seu lugar.</p>
          </div>
          
          <div className="w-full md:w-96">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text"
                placeholder="Buscar cidade..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-12 pl-12 pr-4 bg-white border-2 border-orange-100 focus:border-orange-500 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Mapa */}
        <div className="w-full h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-white relative z-0">
          <div className="absolute top-4 left-4 z-[1000] bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border-2 border-orange-200">
            <p className="text-sm font-bold text-gray-700">
              <span className="text-orange-600">{filteredDestinos.length}</span> destinos
            </p>
          </div>

          <MapContainer center={[-15.7801, -47.9292]} zoom={4} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }} zoomControl={false}>
            <TileLayer attribution='&copy; OSM' url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
            <AutoFitBounds markers={markers} />
            <ZoomControl />

            {filteredDestinos.map((viagem) => {
              const coords = cityCoords[viagem.destino];
              if (!coords) return null;
              return (
                <Marker key={viagem.id} position={[coords.lat, coords.lng]} icon={orangeIcon} eventHandlers={{ click: () => setSelectedDestino(viagem.id) }}>
                  <Popup className="custom-popup" closeButton={true}>
                    <div className="p-2 min-w-[200px]">
                      <h3 className="font-bold text-gray-800 text-lg mb-1">{viagem.destino}</h3>
                      <p className="text-xs text-gray-500 font-bold mb-2">Saindo de {viagem.origem}</p>
                      <p className="text-orange-600 font-bold text-xl mb-3">R$ {viagem.preco ? viagem.preco.toFixed(2).replace('.', ',') : '--'}</p>
                      <button onClick={() => handleBuy(viagem.id)} className="w-full bg-orange-600 text-white font-bold py-2 rounded-lg hover:bg-orange-700">Comprar</button>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>

        {/* Lista */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinos.map((viagem) => (
            <div key={viagem.id} onClick={() => handleBuy(viagem.id)} className="bg-white p-6 rounded-2xl shadow-md border-2 border-transparent hover:border-orange-200 cursor-pointer group hover:-translate-y-1 transition-all">
               <div className="flex justify-between mb-4">
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Origem</p>
                    <p className="font-semibold text-gray-700">{viagem.origem}</p>
                  </div>
                  <ArrowRight className="text-orange-400 group-hover:text-orange-600" />
                  <div className="text-right">
                    <p className="text-xs text-gray-400 font-bold uppercase">Destino</p>
                    <p className="font-bold text-gray-800 text-lg">{viagem.destino}</p>
                  </div>
               </div>
               <div className="border-t pt-4 flex justify-between items-center">
                  <p className="text-3xl font-bold text-orange-600">R$ {viagem.preco ? viagem.preco.toFixed(2).replace('.', ',') : '--'}</p>
                  <ArrowRight size={22} className="text-orange-600"/>
               </div>
            </div>
          ))}
        </div>
      </div>
      <style>{` .leaflet-popup-content-wrapper { border-radius: 16px !important; } `}</style>
    </div>
  );
}