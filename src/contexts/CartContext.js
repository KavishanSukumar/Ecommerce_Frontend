import React, { createContext, useReducer, useState } from "react";
import { reducer as CartReducer, initialState } from '../Reducers/CartReducer'

export const CartContext = createContext()
export const CartProvider = ({ children }) => {
    const [cart_state, dispatch] = useReducer(CartReducer, initialState)



    return (
        <CartContext.Provider value={{ cart_state, dispatch }}>
            {children}
        </CartContext.Provider>
    )
}
