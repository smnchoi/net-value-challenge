import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { productsAtom } from "../atoms";
import { IProduct } from "../utils/parser";

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

const Image = styled.img`
  display: block;
  width: 20%;
  height: 100%;
  flex: 1;
  object-fit: cover;
  image-rendering: optimizeSpeed;
`;

const SimpleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const InfoContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 200px;
  padding: 14px;
  flex: 3;
  margin-left: 20px;
`;

const Sku = styled.div`
  font-size: 18px;
  font-weight: 900;
  color: black;
  margin-left: 20px;
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin: 5px 0;
`;

const NameInput = styled.input(Name);

const Description = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
`;

const DescriptionInput = styled.textarea(Description);

const Price = styled.div`
  font-size: 30px;
  font-weight: 700;
  color: #b12704;
  margin-top: auto;
`;

const PriceInput = styled.input(Price);

const EditButton = styled.button`
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

  &:hover {
    background-color: #ff000075;
  }
`;

const OpenButton = styled(EditButton)`
  padding: 10px 0px 10px 0px;
  background-color: #00a6ff92;

  &:hover {
    background-color: #00a6ff;
  }
`;

interface ProductListItemAdminProps extends IProduct {
  //
}

type FormData = {
  name: string;
  description: string;
  price: string;
};

const ProductListItemAdmin: FC<ProductListItemAdminProps> = ({
  image,
  SKU,
  name,
  description,
  price,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [products, setProduct] = useRecoilState(productsAtom);

  const {
    register,
    formState: { errors, isDirty, isSubmitting },
    watch,
    setValue,
  } = useForm<FormData>();

  const priceString = price.toLocaleString("en-US", {
    style: "currency",
    currency: "NZD",
  });

  const handleOpenClose = () => {
    setIsOpen(!isOpen);
  };

  const handleEditor = () => {
    setIsEditable(!isEditable);

    if (!isEditable) return;

    //* Form data
    const {
      name: updatedName,
      description: updatedDescription,
      price: updatedPrice,
    } = watch();

    if (!window.confirm("Do you want to continue?")) {
      //* Restore data to original values
      setValue("name", name);
      setValue("description", description);
      setValue("price", price.toString());
      return;
    }

    //* Remove original data
    const removed = products.filter((item) => item.SKU !== SKU);

    const updatedProduct: IProduct = {
      SKU,
      name: updatedName,
      description: updatedDescription,
      price: +updatedPrice,
      image,
    };

    //* Push updated data
    removed.push(updatedProduct);
    const updatedProducts: IProduct[] = removed;

    //* Set updated data to Recoil
    setProduct(updatedProducts);
  };

  return (
    <Root>
      <SimpleContainer>
        <Sku>{SKU}</Sku>
        {/* //* Admin */}
        <OpenButton onClick={handleOpenClose}>
          <p>{!isOpen ? "🔽" : "🔼"}</p>
        </OpenButton>
      </SimpleContainer>

      {isOpen && (
        <DetailContainer>
          <Image src={image} alt={name} />

          <InfoContainer>
            {isEditable ? (
              <NameInput {...register("name")} defaultValue={name} />
            ) : (
              <Name children={name} />
            )}
            {isEditable ? (
              <DescriptionInput
                {...register("description")}
                defaultValue={description}
                style={{ resize: "vertical", marginTop: 20, minHeight: 80 }}
              />
            ) : (
              <Description children={description} />
            )}
            {isEditable ? (
              <PriceInput
                {...register("price")}
                defaultValue={price.toString()}
                type="number"
                style={{ marginTop: 20 }}
              />
            ) : (
              <Price children={priceString} />
            )}
          </InfoContainer>

          {/* //* Admin */}
          <EditButton type={"submit"} onClick={handleEditor}>
            <p>{isEditable ? "✅" : "📝"}</p>
          </EditButton>
        </DetailContainer>
      )}
    </Root>
  );
};

export default ProductListItemAdmin;
