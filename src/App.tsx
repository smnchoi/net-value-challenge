import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { productsAtom } from "./atoms";
import AdminPage from "./routes/AdminPage";
import CheckoutPage from "./routes/CheckoutPage";
import ProductsPage from "./routes/ProductsPage";
import SignInPage from "./routes/SignInPage";
import { productsParser } from "./utils/parser";

function App() {
  const [products, setProducts] = useRecoilState(productsAtom);

  useEffect(() => {
    //* Fetch data only at the initial
    if (!products.length) {
      fetchProducts();
    }
  }, []);

  const fetchProducts = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const { products } = await response.json();
    const parsedProducts = productsParser(products);
    setProducts(parsedProducts);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
