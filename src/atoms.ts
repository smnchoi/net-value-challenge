import { atom, selector } from "recoil";
import { Role } from "./utils/constant";
import { IProduct } from "./utils/parser";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

//* Store all products
export const productsAtom = atom<IProduct[]>({
  key: "productsAtom", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});

export const sortedBySKU = selector({
  key: "sortedBySKU",
  get: ({ get }) => {
    const products = get(productsAtom);
    const sorted = [...products].sort((a, b) => {
      const skuNumberA = +a.SKU.split("-")[1];
      const skuNumberB = +b.SKU.split("-")[1];

      return skuNumberA - skuNumberB;
    });

    return sorted;
  },
});

//* Store products that are selected by a user
export const selctedProductsAtom = atom<IProduct[]>({
  key: "selctedProductsAtom", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

interface ICustomerInfo {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
}

interface IUser {
  username: string;
  password: string;
  role: Role;
}

interface ICheckout {
  selectedProducts: IProduct[];
  customerInfo: ICustomerInfo;
  totalPrice: number;
}

//* Store checkouts that are created by customer users
export const checkoutsAtom = atom<ICheckout[]>({
  key: "checkoutsAtom", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});

//* Store all users customer and admin
export const usersAtom = atom<IUser[]>({
  key: "usersAtom", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});
