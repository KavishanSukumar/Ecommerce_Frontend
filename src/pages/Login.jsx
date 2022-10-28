import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import LoopIcon from "@mui/icons-material/Loop";

function Login(props) {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [usernameError, setusernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { username, password } = inputs;
  const onChangeInputs = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const [buttonval, setButtonval] = React.useState(
    <button
      type="submit"
      className="border w-full mt-8 py-2 bg-cyan-500 hover:bg-cyan-400 text-white"
    >
      Sign in
    </button>
  );

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    let checkErrors = 0;

    try {
      if (!password.trim()) {
        setPasswordError("Password is required");
        checkErrors = 1;
      }
      if (!username.trim()) {
        setusernameError("username is required");
        checkErrors = 1;
      }
      if (checkErrors === 0) {
        try {
          var details = {
            'username': username,
            'password': password,
          };



          var formBody = [];
          for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
          }
          formBody = formBody.join("&");

          fetch('/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
          }).then(response => response.json()).then(data => {
            console.log(data)
            const token = data.access_token;
            const refresh = data.refresh_token;

            fetch('/api/user/' + username).then(response => response.json())
              .then(json => {
                localStorage.setItem('token', token);
                localStorage.setItem('refresh', refresh);

                localStorage.setItem('userId', json.id);
                localStorage.setItem('role', json.roles[0].name)
                localStorage.setItem('firstLogin', true)
                window.location.href = "/";
              })




          });
          // fetch("/api/product", {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json', username: username, password: password },


          // }).then(response => response.json())
          //   .then(data => console.log(data));
          // localStorage.setItem('firstLogin', true)
          // window.location.href = "/home";
        } catch (err) {
          alert(err.respose.data.msg)
        }
        setButtonval(
          <button
            type="submit"
            className="border w-full my-5 py-2 bg-cyan-500 text-white"
            disabled
          >
            <LoopIcon className="animate-spin" />
            Processing ...
          </button>
        );
      }
    } catch (error) { }
  };

  return (
    <>
      <form
        onSubmit={onSubmitForm}
        className="flex flex-col lg:flex-row justify-center object-center items-center m-5 p-3 bg-white rounded-lg  shadow-inner "
      >
        <div className="basis-5/12 ml-5">
          <h1 className="text-2xl font-bold text-center py-6">Sign In</h1>
          <div className="flex flex-col py-2">
            <FormControl sx={{ m: 1 }} variant="standard">
              <InputLabel>username</InputLabel>
              <Input
                type="text"
                name="username"
                value={username}
                onChange={(e) => {
                  onChangeInputs(e);
                  setusernameError("");
                }}
              />
            </FormControl>
            <p className="text-red-500 text-sm">{usernameError}</p>
          </div>

          <div className="flex flex-col py-2">
            <FormControl sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                name="password"
                value={password}
                onChange={(e) => {
                  onChangeInputs(e);
                  setPasswordError("");
                }}
                id="standard-adornment-password"
                type={values.showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <p className="text-red-500 text-sm">{passwordError}</p>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block top-8 text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <p
                href="#"
                className="font-medium text-purple-600 hover:text-purple-500"
              >
                Forgot your password?
              </p>
            </div>
          </div>
          <div>{buttonval}</div>
        </div>
      </form>
    </>
  );
}

export default Login;
