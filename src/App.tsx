import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CheckoutPage from "./routes/CheckoutPage";
import ProductsPage from "./routes/ProductsPage";
import SignInPage from "./routes/SignInPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
