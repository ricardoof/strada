import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/button';
import { Input } from '../components/input';
import { InputGroup } from '../components/inputGroup';
import { User, LogOut, PlusCircle, MapPin, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function UserArea() {
    const { user, logout, cancelTrip } = useAuth();
    const navigate = useNavigate();

    // Função de Logout
    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto w-full">
                
                {/* Cabeçalho do Perfil */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                            <User size={40} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">{user?.name}</h1>
                            <p className="text-gray-500">{user?.email}</p>
                            
                            {/* Etiqueta de Admin */}
                            {user?.is_admin === 1 && (
                                <span className="inline-block bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded mt-2">
                                    ADMINISTRADOR
                                </span>
                            )}
                             {user?.is_student === 1 && (
                                <span className="inline-block bg-blue-100 text-blue-600 text-xs font-bold px-2 py-1 rounded mt-2 ml-2">
                                    ESTUDANTE
                                </span>
                            )}
                        </div>
                    </div>
                    
                    <Button onClick={handleLogout} className="bg-gray-200 text-gray-700 hover:bg-gray-300 border-none">
                        <LogOut size={18} className="mr-2" /> Sair da conta
                    </Button>
                </div>

                {/* --- ÁREA EXCLUSIVA DE ADMIN --- */}
                {user?.is_admin === 1 && (
                    <AdminSection />
                )}

                {/* Histórico de Compras (Para todo mundo) */}
                <div className="mt-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Minhas Viagens</h2>
                    
                    {user?.trips && user.trips.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                            {user.trips.map((trip, index) => (
                                <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase ${trip.status === 'Cancelado' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                                {trip.status || 'Confirmado'}
                                            </span>
                                            <span className="text-xs text-gray-400">{new Date(trip.date).toLocaleDateString()}</span>
                                        </div>
                                        <h3 className="font-bold text-lg text-gray-800">
                                            {trip.viagem_detalhes?.origem} <span className="text-gray-400 mx-2">➔</span> {trip.viagem_detalhes?.destino}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Saída: {new Date(trip.viagem_detalhes?.data_saida).toLocaleString()}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Assentos: {trip.assentos?.join(', ')}
                                        </p>
                                    </div>
                                    <div className="text-right flex flex-col items-end gap-2">
                                        <div>
                                            <p className="text-xs text-gray-500">Valor Total</p>
                                            <p className="text-xl font-bold text-orange-600">
                                                R$ {trip.valores?.total.toFixed(2).replace('.', ',')}
                                            </p>
                                        </div>
                                        {trip.status !== 'Cancelado' && (
                                            <Button 
                                                onClick={() => {
                                                    if(confirm('Tem certeza que deseja cancelar esta viagem?')) {
                                                        cancelTrip(index, trip);
                                                    }
                                                }}
                                                className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 text-xs py-1 px-3 h-auto"
                                            >
                                                Cancelar
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white p-8 rounded-2xl text-center text-gray-400 border border-gray-100 border-dashed">
                            <p>Você ainda não realizou nenhuma viagem.</p>
                            <Button variant="primary" className="mt-4" onClick={() => navigate('/destinos')}>
                                Procurar passagens
                            </Button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

// Componente do Formulário de Cadastro (Fica no mesmo arquivo para facilitar)
function AdminSection() {
    const [origem, setOrigem] = useState('');
    const [destino, setDestino] = useState('');
    const [preco, setPreco] = useState('');
    const [imagem, setImagem] = useState('');
    const [dataSaida, setDataSaida] = useState('');
    const [localSaida, setLocalSaida] = useState('');
    const [localChegada, setLocalChegada] = useState('');

    const handleCadastro = async () => {
        if (!origem || !destino || !preco || !dataSaida) {
            alert("Preencha os campos obrigatórios!");
            return;
        }

        try {
            const response = await fetch('http://localhost:3333/destinos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    origem,
                    destino,
                    preco: parseFloat(preco),
                    data_saida: dataSaida,
                    local_saida: localSaida,
                    local_chegada: localChegada,
                    imagem
                })
            });

            if (response.ok) {
                alert("Viagem cadastrada com sucesso!");
                // Limpar formulário
                setOrigem('');
                setDestino('');
                setPreco('');
                setImagem('');
                setDataSaida('');
                setLocalSaida('');
                setLocalChegada('');
            } else {
                alert("Erro ao cadastrar viagem.");
            }
        } catch (error) {
            console.error(error);
            alert("Erro de conexão.");
        }
    }

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-orange-600 mb-8">
            <div className="flex items-center gap-2 mb-6 text-orange-600">
                <PlusCircle size={24} />
                <h2 className="text-xl font-bold">Cadastrar Novo Destino</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-gray-500">Origem</label>
                    <InputGroup className="bg-gray-50 border border-gray-200">
                        <MapPin size={18} className="text-gray-400"/>
                        <Input placeholder="Ex: São Paulo" value={origem} onChange={e => setOrigem(e.target.value)} />
                    </InputGroup>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-gray-500">Destino</label>
                    <InputGroup className="bg-gray-50 border border-gray-200">
                        <MapPin size={18} className="text-gray-400"/>
                        <Input placeholder="Ex: Rio de Janeiro" value={destino} onChange={e => setDestino(e.target.value)} />
                    </InputGroup>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-gray-500">Data e Hora de Saída</label>
                    <InputGroup className="bg-gray-50 border border-gray-200">
                        <Input type="datetime-local" value={dataSaida} onChange={e => setDataSaida(e.target.value)} />
                    </InputGroup>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-gray-500">Preço (R$)</label>
                    <InputGroup className="bg-gray-50 border border-gray-200">
                        <DollarSign size={18} className="text-gray-400"/>
                        <Input type="number" placeholder="0.00" value={preco} onChange={e => setPreco(e.target.value)} />
                    </InputGroup>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-gray-500">Local de Saída (Rodoviária)</label>
                    <InputGroup className="bg-gray-50 border border-gray-200">
                        <MapPin size={18} className="text-gray-400"/>
                        <Input placeholder="Ex: Terminal Tietê" value={localSaida} onChange={e => setLocalSaida(e.target.value)} />
                    </InputGroup>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-gray-500">Local de Chegada</label>
                    <InputGroup className="bg-gray-50 border border-gray-200">
                        <MapPin size={18} className="text-gray-400"/>
                        <Input placeholder="Ex: Novo Rio" value={localChegada} onChange={e => setLocalChegada(e.target.value)} />
                    </InputGroup>
                </div>

                <div className="flex flex-col gap-1 md:col-span-2">
                    <label className="text-sm font-bold text-gray-500">URL da Imagem</label>
                    <InputGroup className="bg-gray-50 border border-gray-200">
                        <Input placeholder="https://..." value={imagem} onChange={e => setImagem(e.target.value)} />
                    </InputGroup>
                </div>
            </div>

            <Button className="mt-6 w-full md:w-auto bg-gray-800 hover:bg-black text-white font-bold" onClick={handleCadastro}>
                Cadastrar Viagem
            </Button>
        </div>
    );
}