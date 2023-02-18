import React, { FC, useState } from "react";
import styled from "styled-components";
import { ICheckout } from "../atoms";
import ProductListItem from "./ProductListItem";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  border-color: black;
  border-width: 2px;
  overflow: hidden;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);

  margin-top: 10px;
  margin-bottom: 10px;

  &:hover {
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
`;

const SimpleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  font-size: 16px;
  font-weight: 600;
  padding: 6px 0px 6px 20px;
  color: black;
`;

const DottedLine = styled.div`
  display: flex;
  width: 100%;
  height: 2px;
  border-width: 2px;
  border-style: dotted;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const CartTitle = styled.div`
  font-size: 18px;
  font-weight: 900;
  color: black;
  margin-left: 20px;
  text-align: left;
`;

const OpenButton = styled.button`
  display: flex;
  flex-direction: row;
  width: 100px;
  height: 100%;
  background-color: #ccc;
  margin-left: auto;

  justify-content: center;
  align-items: center;
  border-width: 0px;

  p {
    font-size: 30px;
    border-radius: 50px;
  }

  padding: 10px 0px 10px 0px;
  background-color: #00a6ff92;

  &:hover {
    background-color: #00a6ff;
  }
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 600;
  padding-bottom: 6px;
  margin-left: 10px;
  text-align: left;
`;

interface CheckoutItemProps extends ICheckout {
  //
}

const CheckoutItem: FC<CheckoutItemProps> = ({
  selectedProducts,
  customerInfo,
  totalPrice,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const totalPriceString = totalPrice.toLocaleString("en-US", {
    style: "currency",
    currency: "NZD",
  });

  const handleOpenClose = () => {
    setIsOpen(!isOpen);
  };

  const { firstname, lastname, email, username } = customerInfo;

  return (
    <Root>
      <SimpleContainer>
        <CartTitle>{`${username}'s Cart`}</CartTitle>
        {/* //* Admin */}
        <OpenButton onClick={handleOpenClose}>
          <p>{!isOpen ? "🔽" : "🔼"}</p>
        </OpenButton>
      </SimpleContainer>

      {isOpen && (
        <DetailContainer>
          <DottedLine />

          <Title children="Customer Information" />
          <Row children={`Name: ${firstname}  ${lastname}`} />
          <Row children={`Email: ${email}`} />

          <DottedLine />

          <Title children={`Purchased Products (${totalPriceString})`} />
          {selectedProducts.map((item, index) => (
            <ProductListItem
              {...item}
              key={index}
              style={{
                height: 180,
                padding: 10,
              }}
            />
          ))}
        </DetailContainer>
      )}
    </Root>
  );
};

export default CheckoutItem;
