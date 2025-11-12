import { BrowserRouter, Route, Routes } from 'react-router-dom'
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path={'/'}/>
        <Route element={<Login />} path={'/login'}/>
        <Route element={<CreateAccount />} path={'/create-account'}/>
        <Route element={<Travel />} path={'/travel'}/>
        <Route element={<Cart />} path={'/cart'}/>
        <Route element={<CreditCard/>} path={'/payment/credit_card'}/>
        <Route element={<DebitCard/>} path={'/payment/debit_card'}/>
        <Route element={<Ticket/>} path={'/payment/boleto'}/>
        <Route element={<Pix/>} path={'/payment/pix'}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
