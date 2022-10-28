import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import Modal from "@mui/material/Modal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { CartContext } from "../contexts/CartContext";

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

function PaymentType({ data }) {
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [purchaseId, setPurchaseId] = React.useState("")
  const { dispatch, cart_state } = React.useContext(CartContext)
  // if (data) {
  //   console.log("data is there")

  // } else if (Object.keys(cart_state.cart).length !== 0) {
  //   console.log("cart is there")

  // } else {
  //   console.log("nothing is there")

  // }




  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [inputs1, setInputs1] = React.useState({
    type1: "creditcard",
    cardName: "",
    cardNo: "",
    cvc: "",
    amount1: ""

  });

  const [inputs2, setInputs2] = React.useState({
    type2: "mobile",
    mobile: "",
    pinNo: "",
    amount2: ""

  });

  const [address, setAddress] = React.useState('');



  const { type1, cardName, cardNo, cvc, amount1 } = inputs1;
  const { type2, mobile, pinNo, amount2 } = inputs2;




  const onChangeInputs1 = (e) => {
    setInputs1({ ...inputs1, [e.target.name]: e.target.value });
  };

  const onChangeInputs2 = (e) => {
    setInputs2({ ...inputs2, [e.target.name]: e.target.value });
  };

  const onChangeInputs3 = (e) => {
    setAddress(e.target.value);
  };



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const submitform = () => {
    window.alert("Payment Successful");
    var check = window.confirm("Would you like deliver the product ?");
    if (check) {
      handleOpen();
    }
  };

  const submitdeliveryform = () => {

    fetch('/api/delivery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },

      body: JSON.stringify({
        "purchase_id": purchaseId,
        "address": address
      })
    }).then(response => response.json()).then(data => {
      window.alert("Devivery Address submitted successfully");
      const user_id = localStorage.getItem('userId');
      if (data) {
        fetch('/api/purchase', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },

          body: JSON.stringify({
            product_id: data.id,
            user_id: user_id,
            quantity: data.quantity,
            total: data.price,
            payment_id: purchaseId
          })
        }).then(response => response.json()).then(data => {
          console.log(data)



        });


      } else if (Object.keys(cart_state.cart).length !== 0) {
        fetch('/api/payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },

          body: JSON.stringify({
            "type": inputs2.type2,
            "cardName": "empty",
            "cardNo": "empty",
            "cvc": "empty",
            "mobile": inputs2.mobile,
            "pinNo": inputs2.pinNo,
            "amount": inputs2.amount2
          })
        }).then(response => response.json()).then(data => {
          console.log(data)
          setPurchaseId(data.id)

          window.alert("Payment Successful");
          var check = window.confirm("Would you like deliver the product ?");
          if (check) {
            handleOpen();
          } else {
            cart_state.cart.map(item => {

              fetch('/api/purchase', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },

                body: JSON.stringify({
                  product_id: item.product_id,
                  user_id: user_id,
                  quantity: item.quantity,
                  total: item.total,
                  payment_id: purchaseId
                })
              }).then(response => response.json()).then(data => {
                console.log(data)



              });
            })
          }
        });

      } else {
        window.alert("Please select product")


      }








    });

  };

  const handleCreditCardPaymentDetails = () => {
    const user_id = localStorage.getItem('userId');

    fetch('/api/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },

      body: JSON.stringify({
        "type": inputs1.type1,
        "cardName": inputs1.cardName,
        "cardNo": inputs1.cardNo,
        "cvc": inputs1.cvc,
        "mobile": "empty",
        "pinNo": "empty",
        "amount": inputs1.amount1
      })
    }).then(response => response.json()).then(data => {
      setPurchaseId(data.id)
      window.alert("Payment Successful");
      var check = window.confirm("Would you like deliver the product ?");
      if (check) {
        handleOpen();
      } else {
        if (data) {
          fetch('/api/purchase', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },

            body: JSON.stringify({
              product_id: data.id,
              user_id: user_id,
              quantity: data.quantity,
              total: data.price,
              payment_id: purchaseId
            })
          }).then(response => response.json()).then(data => {
            console.log(data)



          });


        } else if (Object.keys(cart_state.cart).length !== 0) {
          fetch('/api/payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },

            body: JSON.stringify({
              "type": inputs2.type2,
              "cardName": "empty",
              "cardNo": "empty",
              "cvc": "empty",
              "mobile": inputs2.mobile,
              "pinNo": inputs2.pinNo,
              "amount": inputs2.amount2
            })
          }).then(response => response.json()).then(data => {
            console.log(data)
            setPurchaseId(data.id)

            window.alert("Payment Successful");
            var check = window.confirm("Would you like deliver the product ?");
            if (check) {
              handleOpen();
            } else {
              cart_state.cart.map(item => {

                fetch('/api/purchase', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },

                  body: JSON.stringify({
                    product_id: item.product_id,
                    user_id: user_id,
                    quantity: item.quantity,
                    total: item.total,
                    payment_id: purchaseId
                  })
                }).then(response => response.json()).then(data => {
                  console.log(data)



                });
              })
            }
          });
        } else {
          window.alert("Please select product")


        }

      }




    });
  }


  const handleMobilePaymentDetails = () => {
    console.log(inputs2)
    const user_id = localStorage.getItem('userId');
    if (data) {
      fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({
          "type": inputs2.type2,
          "cardName": "empty",
          "cardNo": "empty",
          "cvc": "empty",
          "mobile": inputs2.mobile,
          "pinNo": inputs2.pinNo,
          "amount": inputs2.amount2
        })
      }).then(response => response.json()).then(data => {
        setPurchaseId(data.id)
        window.alert("Payment Successful");
        var check = window.confirm("Would you like deliver the product ?");
        if (check) {
          handleOpen();
        } else {
          if (data) {
            fetch('/api/purchase', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },

              body: JSON.stringify({
                product_id: data.id,
                user_id: user_id,
                quantity: data.quantity,
                total: data.price,
                payment_id: purchaseId
              })
            }).then(response => response.json()).then(data => {
              console.log(data)



            });


          } else if (Object.keys(cart_state.cart).length !== 0) {
            fetch('/api/payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },

              body: JSON.stringify({
                "type": inputs2.type2,
                "cardName": "empty",
                "cardNo": "empty",
                "cvc": "empty",
                "mobile": inputs2.mobile,
                "pinNo": inputs2.pinNo,
                "amount": inputs2.amount2
              })
            }).then(response => response.json()).then(data => {
              console.log(data)
              setPurchaseId(data.id)

              window.alert("Payment Successful");
              var check = window.confirm("Would you like deliver the product ?");
              if (check) {
                handleOpen();
              } else {
                cart_state.cart.map(item => {

                  fetch('/api/purchase', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },

                    body: JSON.stringify({
                      product_id: item.product_id,
                      user_id: user_id,
                      quantity: item.quantity,
                      total: item.total,
                      payment_id: purchaseId
                    })
                  }).then(response => response.json()).then(data => {
                    console.log(data)



                  });
                })
              }
            });
          } else {
            window.alert("Please select product")


          }

        }




      });
    }








  }



  return (
    <div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="rounded-lg">
            <form onSubmit={submitdeliveryform}
            >
              <h1 className="mb-3">Select the nearest deliver option</h1>
              <FormControl>
                <InputLabel>Delivery Address</InputLabel>
                <Input
                  type="text"
                  name="address"
                  value={address}
                  className="w-full mb-3"
                  onChange={(e) => { onChangeInputs3(e) }}
                  required
                />


              </FormControl>
              <button
                className="border w-full mt-8 py-2 bg-cyan-500 hover:bg-cyan-400 text-white"
              >
                Submit
              </button>
            </form>
          </Box>
        </Modal>
      </div>
      <div className="flex flex-col lg:flex-row  justify-center font-serif h-auto">
        <Box sx={{ width: "500px" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Payment Through Mobile" {...a11yProps(0)} />
              <Tab label="Payment Through Card" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <div>
              <InputLabel>Phone Number</InputLabel>
              <Input
                type="text"
                name="mobile"
                value={mobile}
                className="w-full"
                onChange={(e) => { onChangeInputs2(e) }}
              />
              <InputLabel>Pin Number</InputLabel>
              <Input
                type="text"
                name="pinNo"
                value={pinNo}
                className="w-full"
                onChange={(e) => { onChangeInputs2(e) }}
              />

              <h1 className="mb-3">Amount : {amount2}</h1>

              <button
                onClick={handleMobilePaymentDetails}
                className="border w-full mt-8 py-2 bg-cyan-500 hover:bg-cyan-400 text-white"
              >
                Submit
              </button>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className="flex flex-col justify-between">
              <InputLabel>Card holder's Name</InputLabel>
              <Input
                type="text"
                name="cardName"
                value={cardName}
                className="w-full"
                onChange={(e) => { onChangeInputs1(e) }}
              />
              <InputLabel>Card Number</InputLabel>
              <Input
                type="text"
                name="cardNo"
                value={cardNo}
                className="w-full"
                onChange={(e) => { onChangeInputs1(e) }}
              />

              <div className="flex flex-row justify-between">

                <div>
                  <InputLabel>CVC</InputLabel>
                  <Input
                    type="text"
                    name="cvc"
                    value={cvc}
                    className="w-full"
                    onChange={(e) => { onChangeInputs1(e) }}
                  />
                </div>
              </div>
              <h1 className="mb-3">Amount : {amount1}</h1>

              <button
                onClick={handleCreditCardPaymentDetails}
                className="border w-full mt-8 py-2 bg-cyan-500 hover:bg-cyan-400 text-white"
              >
                Submit
              </button>
            </div>
          </TabPanel>
        </Box>
      </div>
    </div>
  );
}


export default PaymentType;
