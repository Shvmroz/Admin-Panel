import React, { useState } from "react";
import { TextField, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Alert, CircularProgress } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';

export const AddCustomerForm = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    industryType: "",
    customerType: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}api/customer/signup_customer`,
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          password: formData.password,
          industry_type: formData.industryType,
          customer_type: formData.customerType,
        }
      );
      console.log("Customer added successfully:", response.data);
      setLoading(false);
      setSuccessAlert(true);
      setTimeout(() => {
        setSuccessAlert(false);
        navigate("/customer");
      }, 2000);
    } catch (error) {
      console.error("Error adding customer:", error.response);
      setErrorAlert(true);
      setErrorMessage(error.response.data.message);
      setLoading(false);
      setTimeout(() => {
        setErrorAlert(false);
        setErrorMessage("");
      }, 2000);
    }
  };

  return (
    <div>
      <div className="container">
        <h2><span className="my-clr">Add</span><b> Customer.</b></h2>
        <div className="form-container">
          {loading ? (
            <CircularProgress color="success" sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
          ) : (
            <form onSubmit={handleSubmit}>
              {errorAlert && (
                <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
                  {errorMessage}
                </Alert>
              )}
              {successAlert && (
                <Alert severity="success" sx={{ mt: 2, mb: 2 }}>
                  Customer added successfully!
                </Alert>
              )}
              <div className="row">
                <div className="col-6">
                  <TextField
                    sx={{ mt: 4 }}
                    fullWidth
                    id="first-name"
                    name="firstName"
                    label="First Name*"
                    type="text"
                    variant="outlined"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                  <TextField
                    sx={{ mt: 4 }}
                    fullWidth
                    id="email"
                    name="email"
                    label="Email*"
                    type="email"
                    variant="outlined"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <TextField
                    sx={{ mt: 4 }}
                    fullWidth
                    id="customer-type"
                    name="customerType"
                    label="Customer Type"
                    variant="outlined"
                    value={formData.customerType}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-6">
                  <TextField
                    sx={{ mt: 4 }}
                    fullWidth
                    id="last-name"
                    name="lastName"
                    label="Last Name*"
                    variant="outlined"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                  <FormControl sx={{ mt: 4 }} fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password*</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
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
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <TextField
                    sx={{ mt: 4 }}
                    fullWidth
                    id="industry-type"
                    name="industryType"
                    label="Industry Type"
                    variant="outlined"
                    value={formData.industryType}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div style={{ textAlign: 'right', }}>
                <Button startIcon={<CloseIcon />} sx={{ mt: 4, mr: 2 }} variant="outlined" color="warning" onClick={() => navigate("/customer")}>
                  Cancel
                </Button>
                <Button className="btn-clr" sx={{ mt: 4 }} variant="contained" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
