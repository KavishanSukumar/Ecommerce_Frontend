import { useState, useRef, useEffect } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function Seller() {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const handleOpen = (product) => {
    setUpdate({
      productId: product.id,
      updatedProductName: product.name,
      updatedProductDescription: product.description,
      updatedProductPrice: product.price,
      updatedProductQuantity: product.quantity,
      updatedProductAvailablity: product.status
    })


    setOpen(true)
  };
  const handleClose = () => setOpen(false);

  const [openadd, setOpenadd] = React.useState(false);
  const handleOpenadd = () => setOpenadd(true);
  const handleCloseadd = () => setOpenadd(false);

  const [products, setProducts] = React.useState([])
  const [updateProduct, setUpdateProduct] = React.useState({})
  const [inputs, setInputs] = useState({
    productName: "",
    description: "",
    price: "",
    quantity: "",
  });

  const [update, setUpdate] = useState({
    productId: "",
    updatedProductName: "",
    updatedProductDescription: "",
    updatedProductPrice: "",
    updatedProductQuantity: "",
    updatedProductAvailablity: ""
  });

  const { productName, description, price, quantity } = inputs;
  const { productId, updatedProductName, updatedProductDescription, updatedProductPrice, updatedProductQuantity, updatedProductAvailablity } = update;



  const onChangeInputs = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onChangeInputs2 = (e) => {
    setUpdate({ ...update, [e.target.name]: e.target.value });
  };

  const onChangeSearch = async (e) => {
    if (e.target.value !== "") {

      fetch('/api/product/query?name=' + e.target.value).then(response => response.json())
        .then(json => setProducts(json))
    } else {
      fetch('/api/product').then(response => response.json())
        .then(json => setProducts(json))
    }

  }



  useEffect(() => {

    fetch('/api/product').then(response => response.json())
      .then(json => setProducts(json))

  }, [])

  useEffect(() => {
    console.log(products);
  }, [products])

  const createProduct = async (e) => {
    e.preventDefault();

    try {
      var details = {
        'name': productName,
        'description': description,
        'price': parseFloat(price),
        'quantity': parseInt(quantity),
        "status": "Available"
      };



      fetch('/api/product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details)

      }).then(response => response.json()).then(data => {
        if (data.id) {
          details = data
          setProducts([...products, details])
          alert("product added successfully")
          handleClose()


        }

      });
      // fetch("/api/product", {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json', email: email, password: password },


      // }).then(response => response.json())
      //   .then(data => console.log(data));
      // localStorage.setItem('firstLogin', true)
      // window.location.href = "/home";
    } catch (err) {
      alert(err.respose.data.msg)
    }



  }

  const updateProductFunc = async (e) => {
    e.preventDefault();

    try {
      var details = {
        'id': productId,
        'name': updatedProductName,
        'description': updatedProductDescription,
        'price': parseFloat(updatedProductPrice),
        'quantity': parseInt(updatedProductQuantity),
        "status": updatedProductAvailablity
      };


      fetch('/api/product/' + productId, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details)
      })
        .then(response => response.json()).then(data => {
          const newState = products.map(item => {
            if (item.id === productId) {
              return {
                ...item, name: updatedProductName,
                description: updatedProductDescription,
                price: updatedProductPrice,
                quantity: updatedProductQuantity,
                status: updatedProductAvailablity
              }
            }

            return item;
          });

          setProducts(newState);
          // let filteredArray = products.filter(item => item.id !== productId)
          // setProducts(filteredArray)
          // setProducts([...products, details])
          alert("product updated successfully")
          handleClose()




        });
      // fetch("/api/product", {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json', email: email, password: password },


      // }).then(response => response.json())
      //   .then(data => console.log(data));
      // localStorage.setItem('firstLogin', true)
      // window.location.href = "/home";
    } catch (err) {
      alert(err.respose.data.msg)
    }



  }

  const deleteProduct = async (id) => {
    fetch('/api/product/' + id, {
      method: 'DELETE',
    })
      .then(res => res.text())
      .then(res => {
        let filteredArray = products.filter(item => item.id !== id)
        setProducts(filteredArray)
        alert(res)


      })
  }

  // const searchProduct = async () => {

  //   fetch('/api/product/query?' + search).then(response => response.json())
  //     .then(json => setProducts(json))
  // }
  return (
    <>
      <div>
        <Modal
          open={openadd}
          onClose={handleCloseadd}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="rounded-lg">
            <>
              <h2>Add new product</h2>
              <div>
                <form
                  onSubmit={createProduct}>
                  <div className="flex flex-col py-2 ">
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                      <InputLabel>Product Name</InputLabel>
                      <Input type="text" name="productName" value={productName}
                        onChange={(e) => {
                          onChangeInputs(e);
                        }} />
                    </FormControl>
                  </div>
                  <div className="flex flex-col py-2">
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                      <InputLabel>Product Description</InputLabel>
                      <Input type="text" name="description" value={description}
                        onChange={(e) => {
                          onChangeInputs(e);
                        }} />
                    </FormControl>
                  </div>
                  <div className="flex flex-col py-2">
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                      <InputLabel>Unit Price</InputLabel>
                      <Input type="text" name="price" value={price}
                        onChange={(e) => {
                          onChangeInputs(e);
                        }} />
                    </FormControl>
                  </div>
                  <div className="flex flex-col py-2">
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                      <InputLabel>Avaialable Quantity</InputLabel>
                      <Input type="text" name="quantity" value={quantity}
                        onChange={(e) => {
                          onChangeInputs(e);
                        }} />
                    </FormControl>
                  </div>
                  <div>
                    <button className="m-1 py-2 px-4 w-auto bg-cyan-500 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                      Add Product
                    </button>
                  </div>
                </form>
              </div>
            </>
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
            <>
              <h2>Update the product</h2>
              <div>
                <form
                  onSubmit={updateProductFunc}>
                  <div className="flex flex-col py-2 ">
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                      <Input type="text" name="productId" disabled value={productId}
                      />
                    </FormControl>
                  </div>
                  <div className="flex flex-col py-2 ">
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                      <InputLabel>Product Name</InputLabel>
                      <Input type="text" name="updatedProductName" value={updatedProductName}
                        onChange={(e) => {
                          onChangeInputs2(e);
                        }} />
                    </FormControl>
                  </div>
                  <div className="flex flex-col py-2">
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                      <InputLabel>Product Description</InputLabel>
                      <Input type="text" name="updatedProductDescription" value={updatedProductDescription}
                        onChange={(e) => {
                          onChangeInputs2(e);
                        }} />
                    </FormControl>
                  </div>
                  <div className="flex flex-col py-2">
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                      <InputLabel>Product Unit Price</InputLabel>
                      <Input type="text" name="updatedProductPrice" value={updatedProductPrice}
                        onChange={(e) => {
                          onChangeInputs2(e);
                        }} />
                    </FormControl>
                  </div>
                  <div className="flex flex-col py-2">
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                      <InputLabel>Product Quantity</InputLabel>
                      <Input type="text" name="updatedProductQuantity" value={updatedProductQuantity}
                        onChange={(e) => {
                          onChangeInputs2(e);
                        }} />
                    </FormControl>
                  </div>
                  <div className="flex flex-col py-2">
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                      <InputLabel>Product Availablity</InputLabel>
                      <Input type="text" name="updatedProductAvailablity" value={updatedProductAvailablity}
                        onChange={(e) => {
                          onChangeInputs2(e);
                        }} />
                    </FormControl>
                  </div>
                  <div>
                    <button className="m-1 py-2 px-4 w-auto bg-cyan-500 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                      Update Product
                    </button>
                  </div>
                </form>

              </div>
            </>
          </Box>
        </Modal>
      </div>
      <div className="overflow-auto justify-center w-full h-screen">
        <h1 className="text-4xl text-center font-bold">Seller Page</h1>
        <div className="flex flex-col">
          <div className="m-3">
            <button
              onClick={handleOpenadd}
              className="m-1 py-2 px-4 w-auto bg-cyan-500 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >
              Add Product
            </button>
          </div>
          <div className="m-3">
            <label class="relative block">
              <span class="sr-only">Search</span>
              <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg class="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
              </span>
              <input
                onChange={(e) => onChangeSearch(e)}
                class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Search for product..."
                type="text"
                name="search"
              />
            </label>
          </div>
          <div className="m-3">
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
                        onClick={() => { handleOpen(product) }}
                        className="m-1 py-2 px-4 w-auto bg-cyan-500 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm("Do you want to delete this product?") == true) {
                            deleteProduct(product.id);
                          }
                        }}
                        className="m-1 py-2 px-4 w-auto bg-cyan-500 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                      >
                        Delete
                      </button>
                    </td>


                  </tr>
                })}

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Seller;
