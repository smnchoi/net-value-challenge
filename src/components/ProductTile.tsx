import React, { FC } from "react";
import styled from "styled-components";
import { IProduct } from "../utils/parser";

const Root = styled.a<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 300px;
  height: 300px;
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
  display: flex;
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 14px;
  height: 100%;
`;

const Sku = styled.p`
  font-size: 14px;
  color: #9b9b9b;
`;

const Ellipsis = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Name = styled(Ellipsis)`
  font-size: 18px;
  font-weight: 700;
  margin: 5px 0;
`;

const Description = styled(Ellipsis)`
  font-size: 14px;
  margin-bottom: 10px;
  display: block;
`;

const Price = styled(Ellipsis)`
  font-size: 30px;
  font-weight: 700;
  color: #b12704;
  margin-top: auto;
`;

interface ProductTileProps extends IProduct {
  addedInCart: IProduct[];
  setAddedInCart: (item: IProduct[]) => void;
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
  const isAddedInCart = addedInCart.map((product) => product.SKU).includes(SKU);

  const priceString = price.toLocaleString("en-US", {
    style: "currency",
    currency: "NZD",
  });

  return (
    <Root
      isSelected={isAddedInCart}
      onClick={() => {
        isAddedInCart
          ? setAddedInCart([
              ...addedInCart.filter((product) => product.SKU !== SKU),
            ]) //* Remove item
          : setAddedInCart([
              ...addedInCart,
              {
                image,
                SKU,
                name,
                description,
                price,
              },
            ]); //* Add item
      }}
    >
      <Image src={image} alt={name} />
      <InfoContainer>
        <Sku>{SKU}</Sku>
        <Name>{name}</Name>
        <Description>{description}</Description>
        <Price>{priceString}</Price>
      </InfoContainer>
    </Root>
  );
};

export default ProductTile;
