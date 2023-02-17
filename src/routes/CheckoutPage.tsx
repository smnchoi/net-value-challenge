import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { checkoutsAtom, selctedProductsAtom } from "../atoms";
import ProductListItem from "../components/ProductListItem";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  background-color: white;
`;

const Title = styled.p`
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

const SubmitButton = styled(Link)`
  background-color: #ff0000;
  border: none;
  color: #fff;
  padding: 20px;
  font-size: 30px;
  text-align: center;
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
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  const [addedInCart, setSelectedProductsAtom] =
    useRecoilState(selctedProductsAtom);
  const setCheckout = useSetRecoilState(checkoutsAtom);

  const isEmpty = !addedInCart?.length;

  const totalPrice = isEmpty
    ? 0
    : addedInCart.map((item) => item.price).reduce((a, b) => a + b);

  const totalPriceString = totalPrice.toLocaleString("en-US", {
    style: "currency",
    currency: "NZD",
  });

  const handleCheckout = () => {
    //! TODO: Validating inputs

    //* Add checkout
    setCheckout((otherCheckouts) => [
      ...otherCheckouts,
      {
        selectedProducts: addedInCart,
        customerInfo: {
          firstname,
          lastname,
          email,
          username: "username",
        },
        totalPrice,
      },
    ]);

    alert(
      "Products are checked out! You can see the information, if you are an Admin 🚀"
    );

    //* Reset selectedProducts
    setSelectedProductsAtom([]);
  };

  return (
    <Root>
      <Title>
        {isEmpty ? "Your Shopping Cart is Empty" : "List of Products"}
      </Title>

      {!isEmpty &&
        addedInCart &&
        addedInCart.map((item, index) => (
          <ProductListItem
            image={item.image}
            SKU={item.SKU}
            name={item.name}
            description={item.description}
            price={item.price}
            addedInCart={addedInCart}
            setSelectedProductsAtom={setSelectedProductsAtom}
            key={index}
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

      <SubmitButton to="../products" onClick={handleCheckout}>
        Check Out Now! {totalPriceString}
      </SubmitButton>
    </Root>
  );
};

export default CheckoutPage;
