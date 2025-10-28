import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './pages/login'
import { CreateAccount } from './pages/createAccount'
import { Home } from './pages/home'
import { Travel } from './pages/travel'
import { Cart } from './pages/cart'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path={'/'}/>
        <Route element={<Login />} path={'/login'}/>
        <Route element={<CreateAccount />} path={'/create-account'}/>
        <Route element={<Travel />} path={'/travel'}/>
        <Route element={<Cart />} path={'/cart'}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
