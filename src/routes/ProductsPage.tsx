import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import CartHeader from "../components/CartHeader";
import ProductTile from "../components/ProductTile";
import { Product, productsParser } from "../utils/parser";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  background-color: white;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-auto-rows: fit-content(200px);
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;

  padding-bottom: 20px;
  margin: auto;
`;

const ProductsPage: FC = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [addedInCart, setAddedInCart] = useState<string[]>([]);
  // console.log("addedInCart", addedInCart);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const { products } = await response.json();
    const parsedProducts = productsParser(products);
    setProducts(parsedProducts);
  };

  if (!products)
    return (
      <Root>
        <h1 style={{ alignSelf: "center", marginTop: 100 }}>
          Loading products...
        </h1>
      </Root>
    );

  return (
    <Root>
      <CartHeader addedInCart={addedInCart} />
      <ProductsGrid>
        {products.map((item) => (
          <ProductTile
            image={item.image}
            SKU={item.SKU}
            name={item.name}
            description={item.description}
            price={item.price}
            addedInCart={addedInCart}
            setAddedInCart={setAddedInCart}
          />
        ))}
      </ProductsGrid>
    </Root>
  );
};

export default ProductsPage;
