import { RootState } from "@/lib/redux/store";
import { createSelector } from "@reduxjs/toolkit";

export const cartProductsCountSelector = createSelector(
  (state: RootState) => state.cart.products,
  (products) => {
    console.log("looping");
    return Object.values(products).reduce((acc, curr) => acc + curr.length, 0);
  }
);
