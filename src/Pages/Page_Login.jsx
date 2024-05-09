import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Images/logo.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [loginError, setLoginError] = useState(""); // State variable for login error message

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.validity.valid) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.post(
        "http://146.190.164.174:4000/api/app_api/login",
        {
          email: email,
          password: password,
          type: 0,
        }
      );
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", email);
        navigate("/dashboard");
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Sign-in error:", error.response);
      // Set login error message if password is incorrect
      setLoginError("Incorrect email or password. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className=" col-md-6 col-lg-7">
            <div className="lo-go">
              <img className="img-fluid" src={logo} alt="" />
            </div>
            {/* ============= Form Login ================== */}
            <div className="container login-form">
              <form>
                <div className="login-heading">
                  <h2 className="signin-txt mb-3">
                    Sign in to Your DAWA Khana account
                  </h2>
                  <p className="mb-3">
                    Don't have an account yet?
                    <span className="signup-txt">
                      <Link className="my-clr" to={`/signup`}>
                        Sign up
                      </Link>
                    </span>
                  </p>
                </div>
                <div className="mb-3">
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    value={email}
                    onChange={handleEmailChange}
                    error={emailError}
                    helperText={emailError ? "Please enter a valid email" : ""}
                    inputProps={{
                      type: "email",
                    }}
                  />
                </div>
                <div className="mb-3">
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={handlePasswordChange}
                      onKeyPress={handleKeyPress} // Handle Enter key press
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />

                  </FormControl>
                </div>
                {loginError && (
                  <p style={{ color: "red", textAlign: "center" }}>{loginError}</p>
                )}
                <div className="mb-3 form-forget">
                  <Link to={`/ResetPassword`}>
                    <p className="my-clr" style={{ textAlign: "right" }}>
                      <b>Forget Your Password?</b>
                    </p>
                  </Link>
                </div>
                <Button
                  className="btn-clr"
                  variant="contained"
                  color="success"
                  fullWidth
                  sx={{ padding: "12px", color: "white" }} // Set button color and loader color to white
                  onClick={handleLogin}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Sign in"}
                </Button>
              </form>
            </div>
          </div>
          {/* ============ Right side Background ============== */}
          <div className="col-md-6 col-lg-5 p-0 d-none d-md-block">
            <div className="back-img">{/* set background in Css */}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
