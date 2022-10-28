import { useState, useRef, useEffect } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PaymentType from "../components/PaymentType";
import PropTypes from "prop-types";
import Cartpopup from "../components/Cartpopup";
import CartDetailsPopUp from "../components/CartDetailsPopUp";
import SelectQuantity from "../components/SelectQuantity";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function CustomerHome() {
  const [cartproduct, setCartProduct] = useState({})
  const [open, setOpen] = React.useState(false);
  const [products, setProducts] = React.useState([])
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [quantityOpen, setQuantityOpen] = React.useState(false);
  const handleQuantityOpen = () => setQuantityOpen(true);
  const handleQuantityClose = () => setQuantityOpen(false);

  const [openCart, setOpenCart] = React.useState(false);
  const handleOpenCart = () => setOpenCart(true);
  const handleCloseCart = () => setOpenCart(false);

  const [openCartDetails, setOpenCartDetails] = React.useState(false);
  const handleOpenCartDetails = () => setOpenCartDetails(true);
  const handleCloseCartDetails = () => setOpenCartDetails(false);

  const [openProductDetails, setOpenProductDetails] = React.useState(false);
  const handleOpenProductDetails = () => setOpenProductDetails(true);
  const handleCloseProductDetails = () => setOpenProductDetails(false);

  useEffect(() => {
    // const getCategories = async () => {
    //   const res = await axios.get('http://localhost:8080/api/product')
    //   console.log(res)
    // }

    // getCategories()

    fetch('/api/product').then(response => response.json())
      .then(json => setProducts(json))

  }, [])

  useEffect(() => {
    console.log(products);
  }, [products])

  const openconfirm = (product) => {

    setCartProduct(product)


    var check = window.confirm("Are you sure you want to pay?");
    if (check) {
      handleOpen();
    }
  };

  const openCartPopup = (product) => {
    setCartProduct(product)
    var check = window.confirm("Are you sure you want to add to cart?");
    if (check) {
      handleOpenCart();
    }
  };

  const OpenCartDetails = () => {
    console.log("cart")

    handleOpenCartDetails();


  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    localStorage.removeItem('userId');
    localStorage.removeItem('role')
    localStorage.removeItem('firstLogin')
    window.location.href = "/";

  }

  return (
    <>
      <div>
        <Modal
          open={quantityOpen}
          onClose={handleQuantityClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="rounded-lg">
            <SelectQuantity />
          </Box>
        </Modal>
      </div>
      <div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="rounded-lg">
            <PaymentType data={cartproduct} />
          </Box>
        </Modal>
      </div>
      <div>
        <Modal
          open={openCart}
          onClose={handleCloseCart}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="rounded-lg">
            <Cartpopup data={cartproduct} />
          </Box>
        </Modal>
      </div>
      <div>
        <Modal
          open={openCartDetails}
          onClose={handleCloseCartDetails}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="rounded-lg">
            <CartDetailsPopUp />
          </Box>
        </Modal>
      </div>

      <div>
        <Modal
          open={openProductDetails}
          onClose={handleCloseProductDetails}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="rounded-lg">
            <h1>Hello kavishan</h1>
          </Box>
        </Modal>
      </div>


      <div className="overflow-auto justify-center w-full h-screen">
        <h1 className="text-4xl text-center font-bold">Customer Page</h1>
        <button
          onClick={logout}
          className="m-1 py-2 px-4 w-auto bg-cyan-500 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >Logout</button>
        <button
          onClick={OpenCartDetails}
          className="m-1 py-2 px-4 w-auto bg-cyan-500 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >Cart</button>

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
                Product Name
              </th>
              <th
                scope="col"
                class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Description
              </th>
              <th
                scope="col"
                class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Available quantity
              </th>
              <th
                scope="col"
                class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Unit prize
              </th>
              <th
                scope="col"
                class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Status
              </th>

              <th
                scope="col"
                class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="">
            {products.map(product => {
              return <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {product.id}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {product.name}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {product.description}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap truncate overflow-hidden">
                  {product.quantity}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap truncate overflow-hidden">
                  {product.price}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap truncate overflow-hidden">
                  {product.status}
                </td>

                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => { openconfirm(product) }}
                    className="m-1 py-2 px-4 w-auto bg-cyan-500 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                  >
                    Buy Now
                  </button>
                  <button onClick={() => { openCartPopup(product) }} className="m-1 py-2 px-4 w-auto bg-cyan-500 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                    Add to cart
                  </button>
                </td>
              </tr>
            })}

          </tbody>
        </table>
      </div>
    </>
  );
}

export default CustomerHome;
