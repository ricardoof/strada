import { Route, Routes } from 'react-router-dom'
import './App.css'

// Páginas de Autenticação
import { Login } from './pages/login'
import { CreateAccount } from './pages/createAccount'

// Páginas Principais
import { Home } from './pages/home'
import { Trips } from './pages/trips'      // Nova página de Viagens (Substitui a antiga Travel)
import { Help } from './pages/help'        // Nova página de Atendimento
import { Student } from './pages/student'  // Nova página de Estudantes
import { AllDestinations } from './pages/allDestinations';
import { UserArea } from './pages/userArea'

// Fluxo de Pagamento
import { Cart } from './pages/cart'
import { CreditCard } from './pages/creditCard'
import { DebitCard } from './pages/debitCard'
import { Ticket } from './pages/ticket'
import { Pix } from './pages/pix'
import { PurchaseCompleted } from './pages/purchaseCompleted'
import { Checkout } from './pages/checkout'; // Importe da página de Checkout

// Layout
import { MainLayout } from './layouts/MainLayout'

function App() {
  return (
      <Routes>
      {/* Rotas Públicas (Sem Header/Footer) */}
      <Route element={<Login />} path={'/login'}/>
      <Route element={<CreateAccount />} path={'/create-account'}/>

      {/* Rotas Principais (Com Header Laranja e Footer) */}
      <Route element={<MainLayout />} path="/">
        <Route index element={<Home />} />
        
        {/* --- NOVAS ROTAS ADICIONADAS AQUI --- */}
        {/* Note que o path deve ser igual ao que colocamos no navigate() do Header */}
        <Route element={<Trips />} path={'/viagens'}/>
        <Route element={<Student />} path={'/estudantes'}/>
        <Route element={<Help />} path={'/atendimento'}/>
        <Route element={<AllDestinations />} path={'/destinos'}/>
        <Route element={<UserArea />} path={'/minha-conta'}/> 
        {/* ------------------------------------ */}

        <Route element={<Cart />} path={'/cart'}/>
        
        {/* Rotas de Pagamento */}
        <Route element={<CreditCard />} path={'/payment/credit-card'}/>
        <Route element={<DebitCard />} path={'/payment/debit-card'}/>
        <Route element={<Ticket />} path={'/payment/ticket'}/>
        <Route element={<Pix />} path={'/payment/pix'}/>
        <Route element={<Checkout />} path={'/checkout/:id'}/>
        
        {/* Rotas de Sucesso */}
        <Route element={<PurchaseCompleted />} path={'/payment/credit-card/purchase-completed'}/>
        <Route element={<PurchaseCompleted />} path={'/payment/debit-card/purchase-completed'}/>
        <Route element={<PurchaseCompleted />} path={'/payment/ticket/purchase-completed'}/>
        <Route element={<PurchaseCompleted />} path={'/payment/pix/purchase-completed'}/>
      </Route>
    </Routes>
  )
}

export default App