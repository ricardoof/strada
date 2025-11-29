import { useState } from 'react';
import { Phone, Mail, MessageCircle, ChevronDown, Clock } from 'lucide-react';
import { Button } from '../components/button';

export function Help() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto w-full">
                
                {/* Header */}
                <div className="text-center md:text-left mb-10">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Central de Ajuda</h1>
                    <p className="text-gray-600">Tire suas dúvidas ou entre em contato com nosso time de suporte.</p>
                </div>

                {/* Cards de Contato Rápido */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    
                    {/* Chat (Indisponível) */}
                    <ContactCard 
                        icon={<MessageCircle size={32} />} 
                        title="Chat Online" 
                        desc="Nosso chat está offline no momento."
                        action="Indisponível"
                        disabled={true} 
                    />

                    {/* Telefone */}
                    <ContactCard 
                        icon={<Phone size={32} />} 
                        title="Telefone" 
                        desc="Seg a Sex, das 08h às 18h."
                        action="Ligar 0800 123 4567"
                    />

                    {/* E-mail */}
                    <ContactCard 
                        icon={<Mail size={32} />} 
                        title="E-mail" 
                        desc="Resposta em até 24 horas úteis."
                        action="Enviar E-mail"
                    />
                </div>

                {/* Perguntas Frequentes (FAQ) */}
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        Perguntas Frequentes
                    </h2>
                    
                    <div className="flex flex-col">
                        <FaqItem 
                            question="Como cancelo minha passagem?" 
                            answer="Você pode cancelar sua passagem acessando a área 'Minha Conta' > 'Minhas Viagens'. O cancelamento pode ser feito até 3 horas antes do embarque, com reembolso de 95% do valor ou crédito integral para futuras viagens."
                        />
                        <FaqItem 
                            question="Qual a franquia de bagagem permitida?" 
                            answer="Cada passageiro tem direito a despachar até 23kg no bagageiro do ônibus e levar uma bagagem de mão de até 5kg. Volumes extras podem estar sujeitos a cobrança adicional na rodoviária."
                        />
                        <FaqItem 
                            question="Posso viajar com meu animal de estimação?" 
                            answer="Sim! Aceitamos animais de pequeno porte (até 10kg) desde que estejam em caixa de transporte apropriada e com a carteira de vacinação em dia. É necessário apresentar atestado veterinário emitido até 10 dias antes da viagem."
                        />
                        <FaqItem 
                            question="Menores de idade precisam de autorização?" 
                            answer="Menores de 16 anos viajando desacompanhados precisam de autorização judicial. Se estiverem acompanhados de parentes de até 3º grau (avós, tios, irmãos maiores), basta apresentar os documentos originais que comprovem o parentesco."
                        />
                        <FaqItem 
                            question="Como remarcar minha viagem?" 
                            answer="A remarcação pode ser feita pelo site ou guichê com até 3 horas de antecedência, sujeita à diferença de tarifa entre as passagens. A primeira remarcação é gratuita."
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

// Componente do Card de Contato
function ContactCard({ icon, title, desc, action, disabled = false }) {
    return (
        <div className={`
            p-6 rounded-2xl shadow-sm flex flex-col items-center text-center gap-4 transition-all border
            ${disabled 
                ? "bg-gray-50 border-gray-200 opacity-80 cursor-not-allowed" 
                : "bg-white border-transparent hover:border-orange-200 hover:shadow-md hover:-translate-y-1"
            }
        `}>
            <div className={`
                p-4 rounded-full 
                ${disabled ? "bg-gray-200 text-gray-400" : "bg-orange-50 text-orange-600"}
            `}>
                {icon}
            </div>
            
            <div>
                <h3 className={`font-bold ${disabled ? "text-gray-500" : "text-gray-800"}`}>
                    {title}
                </h3>
                <p className="text-sm text-gray-500 mt-1 max-w-[200px] mx-auto">
                    {desc}
                </p>
            </div>

            <Button 
                variant={disabled ? "outline" : "primary"} 
                className={`w-full mt-2 text-sm ${disabled ? "bg-gray-200 text-gray-500 border-gray-200 pointer-events-none" : ""}`}
            >
                {disabled && <Clock size={16} className="mr-2 inline" />}
                {action}
            </Button>
        </div>
    )
}

// Componente do Item do FAQ (Acordeão)
function FaqItem({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-100 last:border-0">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors text-left group rounded-lg"
            >
                <span className={`font-medium transition-colors ${isOpen ? "text-orange-600" : "text-gray-700"}`}>
                    {question}
                </span>
                <ChevronDown 
                    className={`text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-orange-600" : ""}`} 
                    size={20} 
                />
            </button>
            
            {/* Animação simples de altura */}
            <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
            >
                <div className="p-4 pt-0 text-sm text-gray-600 leading-relaxed">
                    {answer}
                </div>
            </div>
        </div>
    )
}