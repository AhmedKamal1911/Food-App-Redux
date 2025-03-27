// import { ProductWithRelations } from "@/lib/types/product";
// import { Size } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type Item = { id: string; price: number };
type AddToCartPayload = {
  addedProduct: {
    id: string;
    qty: number;
    size: Item;
    extras: Item[];
  };
}; // ✅ Define the payload type
type CartItem = {
  products: {
    [id: string]: {
      qty: number;
      size: Item;
      extras: Item[];
    };
  };
};
const initialState: CartItem = {
  products: {},
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const { id, qty, size, extras } = action.payload.addedProduct;

      if (state.products[id]) {
        state.products[id] = {
          ...state.products[id],
          qty: state.products[id].qty + 1,
        };
        console.log("exist increment qty", id);
      } else {
        state.products = {
          ...state.products,
          [id]: { qty, size, extras },
        };
        console.log("not exist and add", state.products);
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
