import { Route, Routes } from 'react-router-dom'
import { Home } from './views/Home'
import { Login } from './views/Login'
import './App.css'

function App() {

  return (
    <>
        <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/home" element={<Home />}/>
        </Routes>
    </>
  )
}

export default App
