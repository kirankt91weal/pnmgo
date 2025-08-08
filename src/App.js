// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./components/LoginScreen";
import HomeScreen from "./components/HomeScreen";
import PaymentScreen from "./components/PaymentScreen";
import TapToPayScreen from "./components/TapToPayScreen";
import ConfirmScreen from "./components/ConfirmScreen";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Layout>
      <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/lookup" element={<div className="p-8 text-center">Order Lookup Screen (Coming Soon)</div>} />
          <Route path="/pay/:orderId" element={<TapToPayScreen />} />
          <Route path="/confirm" element={<ConfirmScreen />} />
          <Route path="/transactions" element={<div className="p-8 text-center">Transactions Screen (Coming Soon)</div>} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/settings" element={<div className="p-8 text-center">Settings Screen (Coming Soon)</div>} />
      </Routes>
      </Layout>
    </Router>
  );
}

export default App;