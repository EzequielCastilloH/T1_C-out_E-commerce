import React, {useState, useMemo} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './public/Login'
import Register from './public/Register'
import MainPage from './user/ProductsPage'
import Cakes from './user/CakesPage'
import Bakery from './user/BakeryPage'
import Dessert from './user/DessertsPage'
import InvoicePage from './admin/Invoices'
import axios from 'axios'
import InventoryPage from './admin/Inventory'
import {ProductContext} from './utils/ProductContext'
import Example from './public/Example'

const App = () => {
  const [ productsToShop, setProductsToShop ] = useState([])
  const providerValue = useMemo(() => ({productsToShop, setProductsToShop}),[productsToShop, setProductsToShop])
  return(
    <ProductContext.Provider value={providerValue}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes*/}
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          {/* Paths for user*/}
          <Route path="/products" element={<MainPage/>}/>
          <Route path="/products/cakes" element={<Cakes/>}/>
          <Route path="/products/bakery" element={<Bakery/>}/>
          <Route path="/products/dessert" element={<Dessert/>}/>
          {/* Paths for admin*/}
          <Route path="/inventory" element={<InventoryPage/>}/>
          <Route path="/invoice" element={<InvoicePage/>}/>
        </Routes>
      </BrowserRouter>
    </ProductContext.Provider>
  )
}

export default App