import { Armchair, Circle, X } from "lucide-react";

export function SeatSelector({ occupied = [], selected = [], onToggle }) {
  // Vamos criar 10 fileiras de 4 cadeiras = 40 lugares
  // Array.from cria um array [0, 1, 2, ..., 9]
  const rows = Array.from({ length: 10 }, (_, i) => i);

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xl w-full max-w-[320px] mx-auto select-none">
      
      {/* Cabeçalho do Autocarro */}
      <div className="flex flex-col items-center border-b pb-4 mb-4">
        <div className="flex items-center gap-2 text-gray-600 mb-2">
           <Armchair className="text-orange-600" />
           <span className="font-bold uppercase text-sm">Semileito</span>
        </div>
        <p className="text-xs text-gray-400">Frente do veículo</p>
      </div>

      {/* Estrutura do Autocarro */}
      <div className="relative border-x-4 border-gray-200 px-4 py-8 rounded-[40px] bg-slate-50">
        
        {/* Volante (Simulado com ícone Circle) */}
        <div className="absolute top-4 left-6 text-gray-300">
            <Circle size={40} strokeWidth={2} />
        </div>
        <div className="w-12 h-0.5 bg-gray-300 absolute top-14 left-6"></div>

        {/* Grid de Assentos: 2 colunas, espaço, 2 colunas */}
        <div className="mt-16 flex flex-col gap-3">
            {rows.map((rowIndex) => {
                // Cálculo da numeração: 
                // Fileira 0: 1, 2, 3, 4
                // Fileira 1: 5, 6, 7, 8
                const start = rowIndex * 4 + 1;
                const seatsInRow = [start, start + 1, start + 2, start + 3];

                return (
                    <div key={rowIndex} className="flex justify-between items-center">
                        {/* Lado Esquerdo (Janela e Corredor) */}
                        <div className="flex gap-2">
                            <Seat 
                                num={seatsInRow[0]} 
                                occupied={occupied} 
                                selected={selected} 
                                onToggle={onToggle} 
                            />
                            <Seat 
                                num={seatsInRow[1]} 
                                occupied={occupied} 
                                selected={selected} 
                                onToggle={onToggle} 
                            />
                        </div>

                        {/* Corredor Central (Vazio) */}
                        <div className="w-6 flex justify-center">
                            <span className="text-[10px] text-gray-300 font-mono">{rowIndex + 1}</span>
                        </div>

                        {/* Lado Direito (Corredor e Janela) */}
                        <div className="flex gap-2">
                            <Seat 
                                num={seatsInRow[2]} 
                                occupied={occupied} 
                                selected={selected} 
                                onToggle={onToggle} 
                            />
                            <Seat 
                                num={seatsInRow[3]} 
                                occupied={occupied} 
                                selected={selected} 
                                onToggle={onToggle} 
                            />
                        </div>
                    </div>
                )
            })}
        </div>
      </div>

      {/* Legenda */}
      <div className="flex justify-center gap-6 mt-6 pt-4 border-t">
        <div className="flex flex-col items-center gap-1">
            <div className="w-5 h-5 rounded-lg border border-gray-400 bg-white"></div>
            <span className="text-[10px] text-gray-500">Livre</span>
        </div>
        <div className="flex flex-col items-center gap-1">
            <div className="w-5 h-5 rounded-lg bg-gray-200 flex items-center justify-center text-gray-400">
                <X size={14} />
            </div>
            <span className="text-[10px] text-gray-500">Ocupado</span>
        </div>
        <div className="flex flex-col items-center gap-1">
             <div className="w-5 h-5 rounded-lg bg-orange-600 shadow-md"></div>
            <span className="text-[10px] text-gray-500">Seu lugar</span>
        </div>
      </div>
    </div>
  );
}

// Componente individual do assento (Célula)
function Seat({ num, occupied, selected, onToggle }) {
    const isOccupied = occupied.includes(num);
    const isSelected = selected.includes(num);

    return (
        <button
            disabled={isOccupied}
            onClick={() => onToggle(num)}
            className={`
                w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold transition-all relative group
                ${isOccupied 
                    ? "bg-gray-100 text-gray-300 cursor-not-allowed" 
                    : isSelected 
                        ? "bg-orange-600 text-white shadow-lg scale-110 border border-orange-700 z-10" 
                        : "bg-white border border-gray-300 text-gray-600 hover:border-orange-500 hover:text-orange-600 hover:shadow-md"
                }
            `}
        >
            {isOccupied ? <X size={18} /> : num}
            
            {/* Detalhe visual da "almofada" do assento (efeito 3D simples) */}
            <div className={`absolute bottom-0 w-[70%] h-1 rounded-t-sm transition-colors ${isSelected ? 'bg-orange-800/30' : 'bg-gray-200 group-hover:bg-orange-100'} `}></div>
        </button>
    )
}