import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { CartContext } from "../contexts/CartContext";
import PaymentType from "../components/PaymentType";
import Modal from "@mui/material/Modal";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};




function CartDetailsPopUp() {
    const [value, setValue] = React.useState(0)
    const { dispatch, cart_state } = React.useContext(CartContext)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleBuy = () => {
        handleOpen();


    }


    const handleValueChange = (e) => {
        setValue(e.target.value)

    }
    const AddToCart = () => {
        console.log(value)
        window.alert("Product added to cart successfully")
    }
    return (
        <>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} className="rounded-lg">
                        <PaymentType />
                    </Box>
                </Modal>
            </div>
            <div>
                <h1>Cart</h1>
                <table class="min-w-full z-0">
                    <thead class="bg-white border-b sticky top-0">
                        <tr>
                            <th
                                scope="col"
                                class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                                Product Id
                            </th>
                            <th
                                scope="col"
                                class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                                Quantity
                            </th>
                            <th
                                scope="col"
                                class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                                Totsl Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {cart_state.cart.map(item => {
                            return <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {item.product_id}
                                </td>

                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {item.quantity}
                                </td>

                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap truncate overflow-hidden">
                                    {item.total}
                                </td>



                            </tr>
                        })}

                    </tbody>
                </table>

                <button onClick={handleBuy} className="m-1 py-2 px-4 w-auto bg-cyan-500 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                    Buy
                </button>
            </div>
        </>
    );
}

export default CartDetailsPopUp;