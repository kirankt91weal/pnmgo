// src/App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./components/LoginScreen";
import HomeScreen from "./components/HomeScreen";
import PaymentScreen from "./components/PaymentScreen";
import PaymentMethodScreen from "./components/PaymentMethodScreen";
import TapToPayScreen from "./components/TapToPayScreen";
import ACHPaymentScreen from "./components/ACHPaymentScreen";
import TipScreen from "./components/TipScreen";
import ConfirmScreen from "./components/ConfirmScreen";
import TransactionsScreen from "./components/TransactionsScreen";
import SettingsScreen from "./components/SettingsScreen";
import Layout from "./components/Layout";

function App() {
  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <Router>
      <Layout>
      <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/lookup" element={<div className="p-8 text-center">Order Lookup Screen (Coming Soon)</div>} />
          <Route path="/pay/:orderId" element={<TapToPayScreen />} />
          <Route path="/tap-to-pay" element={<TapToPayScreen />} />
          <Route path="/ach-payment" element={<ACHPaymentScreen />} />
          <Route path="/tip" element={<TipScreen />} />
          <Route path="/confirm" element={<ConfirmScreen />} />
          <Route path="/transactions" element={<TransactionsScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/payment-method" element={<PaymentMethodScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
      </Routes>
      </Layout>
    </Router>
  );
}

export default App;