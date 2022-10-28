import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import * as React from "react";

function SignUp() {
  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const [inputs, setInputs] = React.useState({
    email: "",
    username: "",
    password: "",
    conf_password: "",
  });

  const { email, username, password, conf_password } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {};

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center object-center items-center m-5 p-3 bg-white rounded-lg  shadow-inner  ">
        <form onSubmit={onSubmitForm} className="">
          <h1 className="text-xl font-bold text-center py-2">
            Customer Sign Up
          </h1>

          <div className="flex flex-col py-2 ">
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel>Email</InputLabel>
              <Input
                type="text"
                name="email"
                onChange={(e) => {
                  onChange(e);
                }}
                value={email}
              />
            </FormControl>
          </div>

          <div className="flex flex-col py-2">
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel>Username</InputLabel>
              <Input
                type="text"
                name="username"
                onChange={(e) => {
                  onChange(e);
                }}
                value={username}
              />
            </FormControl>
          </div>

          <div className="flex flex-col justify-around">
            <div className="flex flex-row">
              <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">
                  Password
                </InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={password}
                  name="password"
                  onChange={(e) => {
                    onChange(e);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password-confrim">
                  Confirm Password
                </InputLabel>
                <Input
                  id="standard-adornment-password-confrim"
                  type={values.showPassword ? "text" : "password"}
                  value={conf_password}
                  name="conf_password"
                  onChange={(e) => {
                    onChange(e);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
          </div>

          <div className="flex items-center justify-between ">
            <div className="flex items-center mt-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label
                htmlFor="terms"
                className="ml-2 block top-8 text-sm text-indigo-700 right-0"
              >
                Accept Terms & Conditions
              </label>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="border w-full my-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-white"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUp;
