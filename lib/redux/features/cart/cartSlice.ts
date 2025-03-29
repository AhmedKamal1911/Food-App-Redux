// import { ProductWithRelations } from "@/lib/types/product";
// import { Size } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AddToCartPayload = {
  id: string;
  sizeId: string;
  extrasIds: string[];
}; // ✅ Define the payload type

type CartState = {
  products: {
    [id: string]: {
      qty: number;
      sizeId: string;
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
      const sizeExtrasStringPayload = generateSizeExtrasString(
        sizeId,
        extrasIds
      );
      const sizeExtrasStringStore = state.products[id]?.map((product) =>
        generateSizeExtrasString(product.sizeId, product.extrasIds)
      );
      if (sizeExtrasStringStore?.includes(sizeExtrasStringPayload))
        return state;
      state.products[id] = [
        ...(state.products[id] ?? []),
        { sizeId, extrasIds, qty: 1 },
      ];
    },
    incrementCartItemQty: (
      state,
      action: PayloadAction<{ id: string; sizeId: string; extrasIds: string[] }>
    ) => {
      state.products[action.payload.id].find(
        (p) =>
          generateSizeExtrasString(p.sizeId, p.extrasIds) ===
          generateSizeExtrasString(
            action.payload.sizeId,
            action.payload.extrasIds
          )
      )!.qty++;
    },
  },
});
function generateSizeExtrasString(sizeId: string, extrasIds: string[]) {
  return `${sizeId}-${extrasIds.toSorted().toString()}`;
}
export const { addToCart, incrementCartItemQty } = cartSlice.actions;
export default cartSlice.reducer;
