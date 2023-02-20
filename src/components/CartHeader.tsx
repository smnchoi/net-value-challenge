import React, { FC } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { IProduct } from "../utils/parser";

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px 10px 20px;
  margin-top: 20px;
  margin-bottom: 30px;
  background-color: black;
`;

const Checkout = styled(Link)`
  font-size: 30px;
  font-weight: 900;
  color: white;
  padding: 10px;

  &:hover {
    color: black;
    background-color: white;
    border-radius: 10px;
  }
`;

const SelectedCount = styled.p`
  font-size: 30px;
  font-weight: 600;
  color: white;
`;

type CartHeaderProps = {
  addedInCart: IProduct[];
};

const CartHeader: FC<CartHeaderProps> = ({ addedInCart }) => {
  const goToCheckout = () => {
    //
  };

  return (
    <Root>
      <SelectedCount>{`Cart (+${addedInCart.length} 📦)`}</SelectedCount>
      <Checkout to="../checkout" onClick={goToCheckout}>
        Checkout the Cart 🛒
      </Checkout>
    </Root>
  );
};

export default CartHeader;
