import React, { FC } from "react";
import styled from "styled-components";
import { IProduct } from "../utils/parser";

const Root = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 200px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  border-color: #ccc;
  border-width: 2px;
  overflow: hidden;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);

  margin-top: 10px;
  margin-bottom: 10px;

  &:hover {
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
`;

const Image = styled.img`
  display: block;
  width: 20%;
  height: 100%;
  flex: 1;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 14px;
  flex: 3;
  height: 100%;
  margin-left: 20px;
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

const Xbutton = styled.a`
  display: flex;
  flex-direction: row;
  width: 60px;
  height: 100%;
  background-color: #ccc;
  margin-left: auto;

  justify-content: center;
  align-items: center;

  p {
    font-size: 30px;
    color: white;
    border-radius: 50px;
  }

  &:hover {
    background-color: #ff000075;
  }
`;

interface ProductListItemProps extends IProduct {
  addedInCart?: IProduct[];
  setSelectedProductsAtom?: (item: IProduct[]) => void;
  style?: React.CSSProperties;
}

const ProductListItem: FC<ProductListItemProps> = ({
  image,
  SKU,
  name,
  description,
  price,
  addedInCart,
  setSelectedProductsAtom,
  style,
}) => {
  const priceString = price.toLocaleString("en-US", {
    style: "currency",
    currency: "NZD",
  });

  const inCheckoutPage = !!addedInCart && !!setSelectedProductsAtom;

  return (
    <Root style={style}>
      <Image src={image} alt={name} />
      <InfoContainer>
        <Sku>{SKU}</Sku>
        <Name>{name}</Name>
        <Description>{description}</Description>
        <Price>{priceString}</Price>
      </InfoContainer>
      {/* //* Customer */}
      {inCheckoutPage && (
        <Xbutton
          onClick={() => {
            // alert("Remove?");
            setSelectedProductsAtom([
              ...addedInCart.filter((product) => product.SKU !== SKU),
            ]); //* Remove item
          }}
        >
          <p>❌</p>
        </Xbutton>
      )}
    </Root>
  );
};

export default ProductListItem;
