import React, { FC, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { productsAtom, selctedProductsAtom } from "../atoms";
import CartHeader from "../components/CartHeader";
import ProductTile from "../components/ProductTile";
import { IProduct, productsParser } from "../utils/parser";

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
  const products = useRecoilValue(productsAtom);
  const [addedInCart, setAddedInCart] = useRecoilState(selctedProductsAtom);

  if (!products.length)
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
