import React, { FC } from "react";
import styled from "styled-components";
import { Product } from "../utils/parser";

const Root = styled.a<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 400px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  border-color: ${({ isSelected }) => (isSelected ? "#ff0000" : " #ccc")};
  border-width: 2px;
  overflow: hidden;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 14px;
  height: 100%;
`;

const Sku = styled.div`
  font-size: 14px;
  color: #9b9b9b;
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin: 5px 0;
`;

const Description = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
`;

const Price = styled.div`
  font-size: 30px;
  font-weight: 700;
  color: #b12704;
  margin-top: auto;
`;

interface ProductTileProps extends Product {
  addedInCart: string[];
  setAddedInCart: (SKU: string[]) => void;
}

const ProductTile: FC<ProductTileProps> = ({
  image,
  SKU,
  name,
  description,
  price,
  addedInCart,
  setAddedInCart,
}) => {
  const isAddedInCart = addedInCart.includes(SKU);
  return (
    <Root
      isSelected={isAddedInCart}
      onClick={() => {
        isAddedInCart
          ? setAddedInCart([...addedInCart.filter((sku) => sku !== SKU)]) //* Remove item
          : setAddedInCart([...addedInCart, SKU]); //* Add item
      }}
    >
      <Image src={image} alt={name} />
      <InfoContainer>
        <Sku>{SKU}</Sku>
        <Name>{name}</Name>
        <Description>{description}</Description>
        <Price>${price}</Price>
      </InfoContainer>
    </Root>
  );
};

export default ProductTile;
