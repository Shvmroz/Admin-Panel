import React from "react";
import logo from "../Images/logo.png";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import axios from "axios";

const SignUpPage = () => {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState({
    lowercase: false,
    uppercase: false,
    number: false,
    minLength: false,
  });
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleNumberChange = (event) => {
    const formattedNumber = event.target.value.replace(/\D/g, "");
    setNumber(formattedNumber);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (e.target.validity.valid) {
      setNameError(false);
    } else {
      setNameError(true);
    }
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    if (e.target.validity.valid) {
      setLastNameError(false);
    } else {
      setLastNameError(true);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.validity.valid) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    const lowerCaseLetters = /[a-z]/g;
    const upperCaseLetters = /[A-Z]/g;
    const numbers = /[0-9]/g;

    setValidPassword({
      lowercase: newPassword.match(lowerCaseLetters) !== null,
      uppercase: newPassword.match(upperCaseLetters) !== null,
      number: newPassword.match(numbers) !== null,
      minLength: newPassword.length >= 8,
    });
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when signing up
    // Validate all fields
    if (
      !name ||
      !lastName ||
      !email ||
      !password ||
      Object.values(validPassword).some((value) => !value)
    ) {
      // Handle invalid form
      console.error("Form validation failed");
      setLoading(false); // Set loading back to false
      return;
    }
    // Perform API call
    const reqObj = {
      first_name: name,
      last_name: lastName,
      email: email,
      password: password,
      status: true,
    };

    const headers = { "Content-Type": "application/json" };

    try {
      const response = await axios.post(`${apiUrl}api/admin/signup_admin`,
        reqObj,
        { headers }
      );
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        console.log("SignUp successful:", response.data);
        // Handle successful sign-up
        setTimeout(() => {
          setLoading(false); // Set loading back to false
          navigate("/"); // Navigate to dashboard after successful sign-up
        }, 3000); // Delay navigation for 3 seconds
      } else {
        console.error("Error fetching data:", response.statusText);
        setLoading(false); // Set loading back to false
      }
    } catch (error) {
      console.error("SignUp error:", error.response);
      setLoading(false); // Set loading back to false
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 col-lg-7 left-side">
          <div className="the-logo">
            <Link to={`/`}>
              <img className="img-fluid" src={logo} alt="" />
            </Link>
          </div>
          {/* ===== Form SignUp ============================== */}
          <div className="container signup-form">

            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginTop: '50px' }}>
                <CircularProgress />
              </div>

            ) : (
              <form>
                <div>

                </div>
                <div className="signup-heading w-75 mb-3">
                  <h2>Get started with a Forever Free plan</h2>
                  <p>Sign up in seconds, No credit card required.</p>
                </div>
                <div className="first-name mb-3">
                  <TextField
                    required
                    fullWidth
                    label="First Name"
                    value={name}
                    onChange={handleNameChange}
                    error={nameError}
                    helperText={
                      nameError
                        ? "Please enter your name (letters and spaces only)"
                        : ""
                    }
                    inputProps={{ pattern: "[A-Za-z ]+" }}
                  />
                </div>
                <div className="last-name mb-3">
                  <TextField
                    required
                    fullWidth
                    label="Last Name"
                    value={lastName}
                    onChange={handleLastNameChange}
                    error={lastNameError}
                    helperText={
                      lastNameError
                        ? "Please enter your last name (letters and spaces only)"
                        : ""
                    }
                    inputProps={{ pattern: "[A-Za-z ]+" }}
                  />
                </div>
                <div className="email mb-3">
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    value={email}
                    onChange={handleEmailChange}
                    error={emailError}
                    helperText={emailError ? "Please enter a valid email" : ""}
                    inputProps={{ type: "email" }}
                  />
                </div>
                <div className="phone-number mb-3">
                  <TextField
                    id="outlined-basic"
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    type="text"
                    inputProps={{ pattern: "[0-9]*" }}
                    value={number}
                    onChange={handleNumberChange}
                  />
                </div>
                <div className="pass-word">
                  <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    fullWidth
                  />
                  <div className="container validation-icon">
                    <div className="icon">
                      <ul>
                        <li>
                          <CircleIcon
                            style={{
                              color: validPassword.lowercase
                                ? "green"
                                : "lightgray",
                              fontSize: "small",
                              marginRight: "10px",
                            }}
                          />
                          <p>Lowercase</p>
                        </li>
                        <li>
                          <CircleIcon
                            style={{
                              color: validPassword.uppercase
                                ? "green"
                                : "lightgray",
                              fontSize: "small",
                              marginRight: "10px",
                            }}
                          />
                          <p>Uppercase</p>
                        </li>
                      </ul>
                    </div>
                    <div className="icon">
                      <ul>
                        <li>
                          <CircleIcon
                            style={{
                              color: validPassword.number ? "green" : "lightgray",
                              fontSize: "small",
                              marginRight: "10px",
                            }}
                          />
                          <p>Number</p>
                        </li>
                        <li>
                          <CircleIcon
                            style={{
                              color: validPassword.minLength
                                ? "green"
                                : "lightgray",
                              fontSize: "small",
                              marginRight: "10px",
                            }}
                          />
                          <p>Minimum length 8</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <p className="text-center m-2">
                  By clicking, you agree to Terms of Use, Privacy Policy and
                  Anti-Spam Policy.
                </p>
                <Button
                  className="btn-clr"
                  variant="contained"
                  color="success"
                  fullWidth
                  sx={{ padding: "12px" }}
                  onClick={handleSignUp} // Call handleSignUp function on button click
                >
                  Create My Account
                </Button>

              </form>
            )}
          </div>
        </div>
        {/* ===== Right Side Text ===== */}
        <div className="col-md-6 col-lg-5 d-none d-md-block right-side">
          <div className="container">
            <div className="head-ing mb-5">
              <h2> Try Advanced features html For 30 days</h2>
              <p>Your 30-days trail of Advance feautures includes:</p>
            </div>
            <div className="li-st">
              <ul>
                <li className="mb-4">
                  <h6>
                    <CheckCircleIcon fontSize="small" sx={{ marginRight: 1 }} />
                    Access to premium features
                  </h6>
                  <p>
                    Live Chat, templete library, auto resend, promotions pop-up,
                    Ai writing assistant and more
                  </p>
                </li>
                <li className="mb-4">
                  <h6>
                    <CheckCircleIcon fontSize="small" sx={{ marginRight: 1 }} />
                    Acess to main features accordion
                  </h6>
                  <p>
                    Email automation, landing pages, websites builder and more
                  </p>
                </li>
                <li className="mb-4">
                  <h6>
                    <CheckCircleIcon fontSize="small" sx={{ marginRight: 1 }} />
                    Up to 1,00 subscribers
                  </h6>
                </li>
                <li className="mb-4">
                  <h6>
                    <CheckCircleIcon fontSize="small" sx={{ marginRight: 1 }} />
                    Send up to 12,000 subscribers
                  </h6>
                </li>
                <li className="mb-4">
                  <h6>
                    <CheckCircleIcon fontSize="small" sx={{ marginRight: 1 }} />
                    24/7 live chat support
                  </h6>
                </li>
                <li>
                  <h6>
                    <CheckCircleIcon fontSize="small" sx={{ marginRight: 1 }} />
                    upgrade anytime
                  </h6>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
