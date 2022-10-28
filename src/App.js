import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import CustomerHome from "./pages/CustomerHome";
import Seller from "./pages/Seller";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import PaymentType from "./components/PaymentType";
import { CartProvider } from "./contexts/CartContext";


function App() {
  useEffect(() => {
    const firstlogin = localStorage.getItem("firstLogin");
    if (firstlogin) {
      setLoggedIn(true)
      const token = localStorage.getItem("refresh");
      const role = localStorage.getItem('role');
      setUser(role)
      const prefix = 'Bearer '
      const refresh_token = prefix.concat(token)
      fetch('api/token/refresh', {
        headers: {
          'Authorization': refresh_token,
        },
      }).then(response => response.json())
        .then(data => {
          localStorage.setItem('token', data.access_token);
          localStorage.setItem('refresh', data.refresh_token);



        })
    }

  }, [])
  const [user, setUser] = useState("ROLE_USER");
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <div className="App">
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route
          exact
          path="/"
          element={
            loggedIn === false ? (
              <Login />
            ) : user === "ROLE_SELLER" ? (
              <Seller />
            ) : (
              <CartProvider>
                <CustomerHome />
              </CartProvider>
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
