import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from './componets/Index'
import AddProduct from './componets/admin/addProduct'
import AddClient from './componets/client/addClient'

const App = () => {
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Index/>} />
    <Route path="/addProduct" element={<AddProduct/>} />
    <Route path="/addClient" element={<AddClient/>} />
  </Routes>

  </BrowserRouter>
  )
}

export default App
