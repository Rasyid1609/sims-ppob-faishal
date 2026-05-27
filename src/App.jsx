import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import TopUpPage from './pages/TopUpPage'
import ServicePage from "./pages/ServicePage";
import TransactionPage from "./pages/TransactionPage";
import AccountPage from "./pages/AccountPage";

export default function App() {
  return (
    
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/home' element={<HomePage />} />
      <Route path="/topup" element={<TopUpPage />} />
      <Route path="/service/:serviceCode" element={<ServicePage />} /><Route
        path="/transaction"
        element={<TransactionPage />}
      />
      <Route
        path="/profile"
        element={<AccountPage />}
      />
    </Routes>
  )
}
