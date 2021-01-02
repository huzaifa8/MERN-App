import { createContext, useContext } from "react";

export const cartContext = createContext();

export function useCart() {
  return useContext(cartContext);
}
