import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import ProductListItem from "../components/ProductListItem";
import { Product, productsParser } from "../utils/parser";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  background-color: white;
`;

const Title = styled.body`
  font-size: 40px;
  font-weight: 600;
  text-align: center;
  padding-top: 30px;
  padding-bottom: 30px;
`;

const Input = styled.input`
  padding: 14px;
  margin-bottom: 10px;
  width: 100%;
  font-size: 16px;
  border: 1px solid #b5b5b5;
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: #000000;
  }
`;

const SubmitButton = styled.button`
  background-color: #ff0000;
  border: none;
  color: #fff;
  padding: 14px;
  font-size: 16px;
  border-radius: 4px;
  width: 100%;
  margin-top: 20px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #9d0303;
  }
`;

const CheckoutPage: FC = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [addedInCart, removeFromCart] = useState<string[]>([]);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const { products } = await response.json();
    const parsedProducts = productsParser(products);
    setProducts(parsedProducts);
  };

  const handleCheckout = () => {
    //
    alert(
      "Products are checked out! You can see the information, if you are an andmin 🚀"
    );
  };

  if (!products)
    return (
      <Root>
        <h1 style={{ alignSelf: "center", marginTop: 100 }}>
          Loading products...
        </h1>
      </Root>
    );

  const totalPrice = products
    .map((item) => item.price)
    .reduce((a, b) => a + b)
    .toLocaleString("en-US", {
      style: "currency",
      currency: "NZD",
    });
  const isEmpty = !products?.length;

  return (
    <Root>
      <Title>
        {isEmpty ? "Your Shopping Cart is Empty" : "List of Products"}
      </Title>

      {!isEmpty &&
        products &&
        products.map((item) => (
          <ProductListItem
            image={item.image}
            SKU={item.SKU}
            name={item.name}
            description={item.description}
            price={item.price}
            addedInCart={addedInCart}
            removeFromCart={removeFromCart}
          />
        ))}

      <Input
        type="text"
        placeholder="First Name"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
      />

      <Input
        type="text"
        placeholder="Last Name"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
      />
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <SubmitButton type="submit" onClick={handleCheckout}>
        Check Out Now! {totalPrice}
      </SubmitButton>
    </Root>
  );
};

export default CheckoutPage;
