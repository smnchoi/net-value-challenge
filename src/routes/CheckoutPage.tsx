import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Route, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { authAtom, checkoutsAtom, selctedProductsAtom } from "../atoms";
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
  padding-top: 100px;
  padding-bottom: 30px;
`;

const BackTo = styled(Link)`
  font-size: 40px;
  font-weight: 600;
  text-align: center;
  color: white;

  padding: 20px;

  margin: 20px auto;
  border-radius: 20px;

  background-color: #ff0000;
  &:hover {
    background-color: #9d0303;
  }
`;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 40px 60px 40px;
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

const ErrorMessage = styled.p`
  margin-bottom: 20px;
  margin-top: 60px;
  color: #d81e05;
  font-size: 14px;
  font-weight: 600;
`;

const SubmitButton = styled.input`
  background-color: #ff0000;
  border: none;
  color: #fff;
  padding: 20px;

  font-size: 30px;
  font-weight: 900;
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

type FormData = {
  firstname: string;
  lastname: string;
  email: string;
};

const CheckoutPage: FC = () => {
  const [addedInCart, setSelectedProductsAtom] =
    useRecoilState(selctedProductsAtom);
  const setCheckout = useSetRecoilState(checkoutsAtom);
  const { user } = useRecoilValue(authAtom);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
  } = useForm<FormData>();

  const navigate = useNavigate();

  const isEmpty = !addedInCart?.length;

  const totalPrice = isEmpty
    ? 0
    : addedInCart.map((item) => item.price).reduce((a, b) => a + b);

  const totalPriceString = totalPrice.toLocaleString("en-US", {
    style: "currency",
    currency: "NZD",
  });

  const handleCheckout = () => {
    const { firstname, lastname, email } = watch();

    //* Add checkout
    setCheckout((otherCheckouts) => [
      ...otherCheckouts,
      {
        selectedProducts: addedInCart,
        customerInfo: {
          firstname,
          lastname,
          email,
          username: user ? user?.username : "USER",
        },
        totalPrice,
      },
    ]);

    window.alert(
      "Products are checked out! You can see the information, if you are an Admin 🚀"
    );

    //* Go back to products
    navigate("/");

    //* Reset selectedProducts
    setSelectedProductsAtom([]);
  };

  return (
    <Root>
      <Title>
        {isEmpty ? "Your Shopping Cart is Empty" : "List of Products"}
      </Title>
      {isEmpty && <BackTo to="../" children="Back to products page" />}

      {!isEmpty && (
        <Container onSubmit={handleSubmit(handleCheckout)}>
          {addedInCart &&
            addedInCart.map((item, index) => (
              <ProductListItem
                {...item}
                addedInCart={addedInCart}
                setSelectedProductsAtom={setSelectedProductsAtom}
                key={index}
              />
            ))}

          <ErrorMessage>
            {errors.firstname && errors.firstname.message}
            <br />
            {errors.lastname && errors.lastname.message}
            <br />
            {errors.email && errors.email.message}
          </ErrorMessage>

          <Input
            type="text"
            placeholder="First Name"
            aria-invalid={
              !isDirty ? undefined : errors.firstname ? "true" : "false"
            }
            {...register("firstname", {
              required: "First Name is required",
            })}
          />

          <Input
            type="text"
            placeholder="Last Name"
            aria-invalid={
              !isDirty ? undefined : errors.lastname ? "true" : "false"
            }
            {...register("lastname", {
              required: "Last Name is required",
            })}
          />
          <Input
            type="email"
            placeholder="Email"
            aria-invalid={
              !isDirty ? undefined : errors.email ? "true" : "false"
            }
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Please use valid email address",
              },
            })}
          />

          <SubmitButton
            type="submit"
            value={`Check Out Now! ${totalPriceString}`}
          />
        </Container>
      )}
    </Root>
  );
};

export default CheckoutPage;
