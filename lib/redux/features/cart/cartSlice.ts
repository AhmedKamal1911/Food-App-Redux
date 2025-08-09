// import { ProductWithRelations } from "@/lib/types/product";
// import { Size } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AddToCartPayload = {
  id: string;
  sizeId: string | undefined;
  extrasIds: string[];
}; // ✅ Define the payload type

type CartState = {
  products: {
    [id: string]: {
      qty: number;
      sizeId: string | undefined;
      extrasIds: string[];
    }[];
  };
};
const initialState: CartState = {
  products: {},
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const { id, sizeId, extrasIds } = action.payload;
      console.log({ extrasIds });
      const sizeExtrasStringPayload = generateSizeExtrasString(
        sizeId,
        extrasIds
      );

      const sizeExtrasStringStore = state.products[id]?.map((product) =>
        generateSizeExtrasString(product.sizeId, product.extrasIds)
      );
      if (sizeExtrasStringStore?.includes(sizeExtrasStringPayload)) {
        incrementProductQty(state, action.payload);
      } else {
        state.products[id] = [
          ...(state.products[id] ?? []),
          { sizeId, extrasIds, qty: 1 },
        ];
      }
    },
    incrementCartItemQty: (
      state,
      action: PayloadAction<{
        id: string;
        sizeId: string | undefined;
        extrasIds: string[];
      }>
    ) => {
      incrementProductQty(state, action.payload);
    },
    decrementCartItemQty: (
      state,
      action: PayloadAction<{
        id: string;
        sizeId: string | undefined;
        extrasIds: string[];
      }>
    ) => {
      const targetProduct = state.products[action.payload.id].find(
        (p) =>
          generateSizeExtrasString(p.sizeId, p.extrasIds) ===
          generateSizeExtrasString(
            action.payload.sizeId,
            action.payload.extrasIds
          )
      );
      if (targetProduct!.qty > 1) {
        targetProduct!.qty--;
      }
    },
    changeCartItemQty: (
      state,
      action: PayloadAction<{
        id: string;
        sizeId: string | undefined;
        extrasIds: string[];
        qty: number;
      }>
    ) => {
      const targetProduct = state.products[action.payload.id].find(
        (p) =>
          generateSizeExtrasString(p.sizeId, p.extrasIds) ===
          generateSizeExtrasString(
            action.payload.sizeId,
            action.payload.extrasIds
          )
      )!;
      targetProduct.qty = action.payload.qty;
    },

    deleteCartItem: (
      state,
      action: PayloadAction<{
        id: string;
        sizeId: string | undefined;
        extrasIds: string[];
      }>
    ) => {
      const { id, sizeId, extrasIds } = action.payload;
      const targetString = generateSizeExtrasString(sizeId, extrasIds);

      state.products[id] = state.products[id].filter(
        (p) => generateSizeExtrasString(p.sizeId, p.extrasIds) !== targetString
      );

      // Clean up empty product entries
      if (state.products[id].length === 0) {
        delete state.products[id];
      }
    },
  },
});
function generateSizeExtrasString(
  sizeId: string | undefined,
  extrasIds: string[]
) {
  return `${sizeId}-${extrasIds.toSorted().toString()}`;
}
function incrementProductQty(state: CartState, payload: AddToCartPayload) {
  state.products[payload.id].find(
    (p) =>
      generateSizeExtrasString(p.sizeId, p.extrasIds) ===
      generateSizeExtrasString(payload.sizeId, payload.extrasIds)
  )!.qty++;
}
export const {
  addToCart,
  incrementCartItemQty,
  decrementCartItemQty,
  changeCartItemQty,
  deleteCartItem,
} = cartSlice.actions;
export default cartSlice.reducer;
