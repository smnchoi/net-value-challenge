import React, { FC, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  checkoutsAtom,
  productsAtom,
  selctedProductsAtom,
  sortedBySKU,
} from "../atoms";
import CartHeader from "../components/CartHeader";
import CheckoutItem from "../components/CheckoutItem";
import ProductListItemAdmin from "../components/ProductListItemAdmin";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  background-color: white;
`;

const ProductList = styled.div`
  /* display: grid;
  grid-auto-rows: fit-content(200px);
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;

  padding-bottom: 20px;
  margin: auto; */

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: white;
  padding: 20px;
`;

const CartList = styled(ProductList)`
  align-self: flex-start;
`;

const Title = styled.p`
  font-size: 40px;
  font-weight: 600;
  padding-top: 30px;
  padding-bottom: 30px;
`;

const AdminPage: FC = () => {
  const products = useRecoilValue(productsAtom);
  const sortedProducts = useRecoilValue(sortedBySKU);
  const [addedInCart, setAddedInCart] = useRecoilState(selctedProductsAtom);
  const carts = useRecoilValue(checkoutsAtom);

  console.log("carts", carts);

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

      <div
        style={{
          flexDirection: "row",
          display: "flex",
        }}
      >
        <ProductList>
          <Title>Product List</Title>

          {!!sortedProducts &&
            sortedProducts.map((item, index) => (
              <ProductListItemAdmin {...item} key={index} />
            ))}
        </ProductList>

        <CartList>
          <Title>Cart List</Title>

          {!!carts && carts.map((item, index) => <CheckoutItem {...item} />)}
        </CartList>
      </div>
    </Root>
  );
};

export default AdminPage;
