import { useLocalStorage } from '@mantine/hooks';
import { createContext, useReducer } from 'react';
useLocalStorage
export const Store = createContext();

const initialState = {
    cart: { cartItems: [] },
};
function reducer(state, action) {

    switch (action.type) {
        case 'CART_ADD_ITEM': {
            const newItem = action.payload;
            const existItem = state.cart.cartItems.find(
                (item) => item.id === newItem.id
            );
            const cartItems = existItem
                ? state.cart.cartItems.map((item) =>
                    item.name === existItem.name ? newItem : item
                )
                : [...state.cart.cartItems, newItem];
            cartItems.forEach((e) => {
                e['total'] = parseInt(e['price']) * parseInt(e['quantity'])
            })
            let value = { ...state, cart: { ...state.cart, cartItems } }
            if (typeof window !== "undefined") {
                // client-side operation such as local storage.
                localStorage.setItem("cartItems", JSON.stringify(value))
                window.dispatchEvent(new Event('storage'))
            }
            return { ...state, cart: { ...state.cart, cartItems } };
        }
        case "CART_REMOVED_ITEM": {
            const cartItems = action.payload
            let value = { ...state, cart: { ...state.cart, cartItems } }
            if (typeof window !== "undefined") {
                // client-side operation such as local storage.
                localStorage.setItem("cartItems", JSON.stringify(value))
                window.dispatchEvent(new Event('storage'))
            }
            return { ...state, cart: { ...state.cart, cartItems } }
        }
        default:
            return state;
    }

}

export function StoreProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{children}</Store.Provider>;
}