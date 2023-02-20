import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { authAtom, productsAtom } from "./atoms";
import Header from "./components/Header";
import AdminPage from "./routes/AdminPage";
import CheckoutPage from "./routes/CheckoutPage";
import ProductsPage from "./routes/ProductsPage";
import SignInPage from "./routes/SignInPage";
import { productsParser } from "./utils/parser";

function App() {
  const [products, setProducts] = useRecoilState(productsAtom);
  const { isAuthenticated, user } = useRecoilValue(authAtom);
  const role = user?.role;

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
      <Header />
      {!isAuthenticated ? (
        <Routes>
          <Route path="/" element={<SignInPage />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          {role === "Admin" && <Route path="admin" element={<AdminPage />} />}
        </Routes>
      )}
    </Router>
  );
}

export default App;
