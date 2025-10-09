import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './pages/login'
import { CreateAccount } from './pages/createAccount'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path={'/'}/>
        <Route element={<CreateAccount />} path={'/create-account'}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
