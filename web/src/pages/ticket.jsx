import { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Download, Barcode, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '../components/button';
import html2pdf from 'html2pdf.js';
import { useAuth } from '../contexts/AuthContext';
import { ReservationTimer } from "../components/reservationTimer";

export function Ticket() {
    const location = useLocation();
    const navigate = useNavigate();
    const { addTrip } = useAuth();
    const dadosCompra = location.state;
    const [loading, setLoading] = useState(false);
    const [boletoGerado, setBoletoGerado] = useState(null);
    const boletoRef = useRef(null);

    if (!dadosCompra) { navigate('/'); return null; }

    const { valores, dados_usuario, reservationExpiresAt } = dadosCompra;

    // --- FUNÇÕES DE GERAÇÃO (SIMULAÇÃO) ---
    const generateBarcode = () => {
        let barcode = '';
        for (let i = 0; i < 47; i++) barcode += Math.floor(Math.random() * 10);
        return barcode;
    };

    const formatBarcode = (barcode) => {
        return `${barcode.slice(0, 5)}.${barcode.slice(5, 10)} ${barcode.slice(10, 15)}.${barcode.slice(15, 21)} ${barcode.slice(21, 26)}.${barcode.slice(26, 32)} ${barcode.slice(32, 33)} ${barcode.slice(33, 47)}`;
    };

    const handleFinalizarEGerar = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:3333/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    viagem_id: dadosCompra.viagem_id,
                    assentos: dadosCompra.assentos,
                    dados_usuario: dadosCompra.dados_usuario,
                    dados_passageiro: dadosCompra.dados_passageiro
                })
            });

            const data = await res.json();

            if (res.ok) {
                addTrip({ ...dadosCompra, date: new Date().toISOString(), status: 'Aguardando Pagamento' });
                const hoje = new Date();
                const vencimento = new Date(hoje);
                vencimento.setDate(vencimento.getDate() + 3);
                const barcode = generateBarcode();

                setBoletoGerado({
                    beneficiario: 'STRADA TRANSPORTES LTDA',
                    cnpjBeneficiario: '12.345.678/0001-90',
                    pagador: dados_usuario.nome,
                    cpfPagador: dados_usuario.cpf,
                    valor: `R$ ${valores.total.toFixed(2).replace('.', ',')}`,
                    vencimento: vencimento.toLocaleDateString('pt-BR'),
                    dataEmissao: hoje.toLocaleDateString('pt-BR'),
                    numeroDocumento: `${Math.floor(100000 + Math.random() * 900000)}`,
                    codigoBarras: barcode,
                    linhaDigitavel: formatBarcode(barcode),
                    banco: '001 - Banco do Brasil',
                    agencia: '1234-5',
                    conta: '99999-9',
                    nossoNumero: `${Math.floor(10000000 + Math.random() * 90000000)}`
                });
            } else {
                alert("Erro ao processar compra: " + (data.message || "Tente novamente"));
            }
        } catch (error) {
            console.error(error);
            alert("Erro de conexão");
        } finally {
            setLoading(false);
        }
    };

    const downloadBoleto = async () => {
    const element = boletoRef.current;

    if (!element) {
        alert("Erro: O boleto ainda não foi gerado na tela.");
        return;
    }

    try {
        const opt = {
            margin: 10,
            filename: `boleto-strada-${dadosCompra.viagem_id}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2,
                useCORS: true,
                logging: true, // Ativar logs para debug
                backgroundColor: '#ffffff'
            },
            jsPDF: { 
                unit: 'mm', 
                format: 'a4', 
                orientation: 'portrait'
            }
        };

        await html2pdf().set(opt).from(element).save();
        
    } catch (err) {
        console.error("Erro detalhado:", err);
        alert("Erro ao gerar PDF. Tente usar a impressão do navegador (Ctrl+P).");
    }
};

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 flex justify-center">
            <ReservationTimer expiresAt={reservationExpiresAt} />
            <div className="w-full max-w-3xl">

                {!boletoGerado ? (
                    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto text-center border-t-4 border-orange-600">
                        <Barcode size={48} className="mx-auto text-orange-600 mb-4" />
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Pagamento com Boleto</h1>
                        <p className="text-gray-500 mb-6">
                            Ao confirmar, sua reserva será efetivada e o boleto será gerado para pagamento.
                        </p>

                        <div className="bg-orange-50 p-4 rounded-xl mb-6 text-left">
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-600">Valor a pagar:</span>
                                <span className="font-bold text-orange-600 text-lg">R$ {valores.total.toFixed(2).replace('.', ',')}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Vencimento:</span>
                                <span className="font-bold text-gray-800">3 dias úteis</span>
                            </div>
                        </div>

                        <Button
                            width="full"
                            className="bg-orange-600 hover:bg-orange-700 h-12 font-bold text-lg"
                            onClick={handleFinalizarEGerar}
                            disabled={loading}
                        >
                            {loading ? 'Processando...' : 'Finalizar e Gerar Boleto'}
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4">

                        <div className="flex flex-col md:flex-row justify-between items-center bg-green-50 p-4 rounded-xl border border-green-200">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="text-green-600" size={32} />
                                <div>
                                    <h2 className="text-green-800 font-bold text-lg">Compra Registrada com Sucesso!</h2>
                                    <p className="text-green-700 text-sm">Baixe o boleto ou use o código de barras abaixo.</p>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-4 md:mt-0">
                                <Button 
                                    variant="outline" 
                                    onClick={downloadBoleto} 
                                    className="flex gap-2 items-center bg-white border-green-200 text-green-700 hover:bg-green-100"
                                >
                                    <Download size={18} /> Baixar PDF
                                </Button>
                                <Button 
                                    onClick={() => navigate('/payment/ticket/purchase-completed')} 
                                    className="bg-green-600 hover:bg-green-700 text-white flex gap-2 items-center"
                                >
                                    Concluir <ArrowRight size={18} />
                                </Button>
                            </div>
                        </div>

                        {/* Usar ref em vez de id para melhor controle */}
                        <div ref={boletoRef} className="bg-white p-8 shadow-2xl rounded-sm overflow-x-auto">
                            <div className="min-w-[700px] border-2 border-dashed border-gray-300 p-4 mb-4 text-xs text-gray-400 text-right">
                                Recibo do Pagador
                            </div>

                            <div className="min-w-[700px] border-2 border-black p-4 font-sans text-xs text-black">

                                <div className="flex items-end border-b-2 border-black pb-1 mb-2">
                                    {/* LOGO DO BANCO CORRIGIDA */}
                                    <div className="w-16 flex items-center justify-center">
                                        <div className="bg-black text-white font-bold text-xs p-1 rounded w-16 h-8 flex items-center justify-center">
                                            BB
                                        </div>
                                    </div>
                                    <div className="px-4 text-xl font-bold border-l-2 border-r-2 border-black mx-2">001-9</div>
                                    <div className="flex-1 text-right text-sm font-bold tracking-widest">{boletoGerado.linhaDigitavel}</div>
                                </div>

                                {/* Linha 1 */}
                                <div className="grid grid-cols-[1fr_150px] gap-[1px] bg-black border border-black mb-[1px]">
                                    <div className="bg-white p-1">
                                        <div className="text-[9px] text-gray-500 uppercase">Local de Pagamento</div>
                                        <div className="font-bold">PAGÁVEL EM QUALQUER BANCO ATÉ O VENCIMENTO</div>
                                    </div>
                                    <div className="bg-white p-1">
                                        <div className="text-[9px] text-gray-500 uppercase">Vencimento</div>
                                        <div className="font-bold text-right">{boletoGerado.vencimento}</div>
                                    </div>
                                </div>

                                {/* Linha 2 */}
                                <div className="grid grid-cols-[1fr_150px] gap-[1px] bg-black border border-black mb-[1px]">
                                    <div className="bg-white p-1">
                                        <div className="text-[9px] text-gray-500 uppercase">Beneficiário</div>
                                        <div className="font-bold">{boletoGerado.beneficiario}</div>
                                    </div>
                                    <div className="bg-white p-1">
                                        <div className="text-[9px] text-gray-500 uppercase">Agência / Código Beneficiário</div>
                                        <div className="font-bold text-right">{boletoGerado.agencia} / {boletoGerado.conta}</div>
                                    </div>
                                </div>

                                {/* Linha 3 (Dupla) */}
                                <div className="grid grid-cols-[1fr_150px] gap-[1px] bg-black border border-black mb-[1px]">
                                    <div className="bg-white grid grid-cols-4 gap-[1px] bg-black">
                                        <div className="bg-white p-1">
                                            <div className="text-[9px] text-gray-500 uppercase">Data do Doc</div>
                                            <div className="">{boletoGerado.dataEmissao}</div>
                                        </div>
                                        <div className="bg-white p-1">
                                            <div className="text-[9px] text-gray-500 uppercase">No. do Doc</div>
                                            <div className="">{boletoGerado.numeroDocumento}</div>
                                        </div>
                                        <div className="bg-white p-1">
                                            <div className="text-[9px] text-gray-500 uppercase">Espécie Doc</div>
                                            <div className="">DM</div>
                                        </div>
                                        <div className="bg-white p-1">
                                            <div className="text-[9px] text-gray-500 uppercase">Aceite</div>
                                            <div className="">N</div>
                                        </div>
                                    </div>
                                    <div className="bg-white p-1">
                                        <div className="text-[9px] text-gray-500 uppercase">Nosso Número</div>
                                        <div className="font-bold text-right">{boletoGerado.nossoNumero}</div>
                                    </div>
                                </div>

                                {/* Linha 4 (Uso Banco e Valor) */}
                                <div className="grid grid-cols-[1fr_150px] gap-[1px] bg-black border border-black mb-[1px]">
                                    <div className="bg-white grid grid-cols-4 gap-[1px] bg-black">
                                        <div className="bg-white p-1">
                                            <div className="text-[9px] text-gray-500 uppercase">Uso do Banco</div>
                                            <div className=""></div>
                                        </div>
                                        <div className="bg-white p-1">
                                            <div className="text-[9px] text-gray-500 uppercase">Carteira</div>
                                            <div className="">17</div>
                                        </div>
                                        <div className="bg-white p-1">
                                            <div className="text-[9px] text-gray-500 uppercase">Espécie</div>
                                            <div className="">R$</div>
                                        </div>
                                        <div className="bg-white p-1">
                                            <div className="text-[9px] text-gray-500 uppercase">Quantidade</div>
                                            <div className=""></div>
                                        </div>
                                    </div>
                                    <div className="bg-white p-1 bg-yellow-50">
                                        <div className="text-[9px] text-gray-500 uppercase">(=) Valor do Documento</div>
                                        <div className="font-bold text-right">{boletoGerado.valor}</div>
                                    </div>
                                </div>

                                {/* Instruções */}
                                <div className="grid grid-cols-[1fr_150px] gap-[1px] bg-black border border-black mb-[1px] min-h-[100px]">
                                    <div className="bg-white p-1">
                                        <div className="text-[9px] text-gray-500 uppercase">Instruções</div>
                                        <div className="mt-1">
                                            <p>SR. CAIXA, NÃO RECEBER APÓS O VENCIMENTO.</p>
                                            <p>NÃO RECEBER PAGAMENTO EM CHEQUE.</p>
                                            <p>PASSAGEM REFERENTE À VIAGEM DE {dadosCompra.viagem_detalhes?.origem || 'ORIGEM'} PARA {dadosCompra.viagem_detalhes?.destino || 'DESTINO'}.</p>
                                        </div>
                                    </div>
                                    <div className="bg-white p-1">
                                        <div className="text-[9px] text-gray-500 uppercase">(-) Desconto / Abatimento</div>
                                        <div className="h-4 border-b border-gray-200"></div>
                                        <div className="text-[9px] text-gray-500 uppercase mt-1">(-) Outras Deduções</div>
                                        <div className="h-4 border-b border-gray-200"></div>
                                        <div className="text-[9px] text-gray-500 uppercase mt-1">(+) Mora / Multa</div>
                                        <div className="h-4 border-b border-gray-200"></div>
                                    </div>
                                </div>

                                {/* Pagador */}
                                <div className="border border-black p-2 bg-white">
                                    <div className="text-[9px] text-gray-500 uppercase">Pagador</div>
                                    <div className="font-bold">{boletoGerado.pagador} - CPF: {boletoGerado.cpfPagador}</div>
                                    <div className="text-[10px]">Endereço não informado</div>
                                </div>

                                {/* Código de Barras */}
                                <div className="mt-4 px-4 pb-2">
                                    <div className="h-12 w-full flex items-end justify-start gap-[2px] overflow-hidden opacity-80">
                                        {Array.from({ length: 60 }).map((_, i) => (
                                            <div key={i} className="bg-black" style={{
                                                width: Math.random() > 0.5 ? '2px' : '4px',
                                                height: '100%'
                                            }}></div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                            <div className="text-center text-xs text-gray-400 mt-2 dashed border-t border-gray-300 pt-2">
                                Autenticação Mecânica / Ficha de Compensação
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}