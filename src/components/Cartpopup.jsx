import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { CartContext } from "../contexts/CartContext";



function Cartpopup({ data }) {
  const { dispatch, cart_state } = React.useContext(CartContext)

  const [value, setValue] = React.useState(0)

  const handleValueChange = (e) => {
    setValue(e.target.value)

  }
  const AddToCart = () => {
    const Total = value * data.quantity
    const cartData = { product_id: 1, user_id: 1, quantity: 20, total: Total }
    dispatch({ type: "ADD_ITEM", payload: cartData })
    console.log("555555")

    console.log(cart_state)

    window.alert("Product added to cart successfully")
  }
  return (
    <div>
      <h1>Product Details</h1>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "50ch", height: "10ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Order Amount"
          value={value}
          variant="outlined"
          onChange={(e) => { handleValueChange(e) }}

        />
      </Box>
      <button onClick={AddToCart} className="m-1 py-2 px-4 w-auto bg-cyan-500 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
        Add to Cart
      </button>
    </div>
  );
}

export default Cartpopup;
