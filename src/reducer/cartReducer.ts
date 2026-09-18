import { CartItem } from "../type/CartItem";

export type ActionType =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "DECREASE"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: CartItem }
  | { type: "CLEAR_CART" };

export default function cartReducer(
  state: CartItem[],
  action: ActionType,
): CartItem[] {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingProduct = state.find(
        (product) => product.id === action.payload.id,
      );

      if (existingProduct) {
        return state.map((product) =>
          product.id === action.payload.id
            ? { ...product, quantity: product.quantity + 1 }
            : product,
        );
      } else {
        return [...state, { ...action.payload, quantity: 1 }];
      }
    }

    case "REMOVE_FROM_CART": {
      return state.filter((item) => item.id !== action.payload.id);
    }

    case "DECREASE": {
      const existingProduct = state.find(
        (product) => product.id === action.payload.id,
      );

      if (existingProduct?.quantity === 1)
        return state.filter((product) => product.id !== action.payload.id);

      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );
    }

    case "CLEAR_CART": {
      return [];
    }

    default:
      return state;
  }
}
