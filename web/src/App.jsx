import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './pages/login'
import { CreateAccount } from './pages/createAccount'
import { Home } from './pages/home'
import { Travel } from './pages/travel'
import { Cart } from './pages/cart'
import { CreditCard } from './pages/creditCard'
import { DebitCard } from './pages/debitCard'
import { Ticket } from './pages/ticket'
import { Pix } from './pages/pix'
import { MainLayout } from './layouts/MainLayout'
import { PurchaseCompleted } from './pages/purchaseCompleted'

function App() {
  return (
      <Routes>
      <Route element={<Login />} path={'/login'}/>
      <Route element={<CreateAccount />} path={'/create-account'}/>
      <Route element={<MainLayout />} path="/">
        <Route index element={<Home />} />
        <Route element={<Travel />} path={'/travel'}/>
        <Route element={<Cart />} path={'/cart'}/>
        <Route element={<CreditCard />} path={'/payment/credit-card'}/>
        <Route element={<DebitCard />} path={'/payment/debit-card'}/>
        <Route element={<Ticket />} path={'/payment/ticket'}/>
        <Route element={<Pix />} path={'/payment/pix'}/>
        <Route element={<PurchaseCompleted />} path={'/payment/credit-card/purchase-completed'}/>
        <Route element={<PurchaseCompleted />} path={'/payment/debit-card/purchase-completed'}/>
        <Route element={<PurchaseCompleted />} path={'/payment/ticket/purchase-completed'}/>
        <Route element={<PurchaseCompleted />} path={'/payment/pix/purchase-completed'}/>
      </Route>
    </Routes>
  )
}

export default App
