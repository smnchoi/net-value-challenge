import React, { FC } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { IProduct } from "../utils/parser";

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin-bottom: 30px;
  background-color: red;
`;

const Checkout = styled(Link)`
  font-size: 2rem;
  font-weight: 900;
  color: white;
  padding: 20px;

  &:hover {
    background-color: #880000a7;
    border-radius: 20px;
  }
`;

const SelectedCount = styled.p`
  font-size: 2rem;
  font-weight: 500;
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
      <SelectedCount>{`${addedInCart.length} added to Cart`}</SelectedCount>
      <Checkout to="../checkout" onClick={goToCheckout}>
        Checkout the cart
      </Checkout>
    </Root>
  );
};

export default CartHeader;
