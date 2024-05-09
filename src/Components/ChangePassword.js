import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";

const ChangePasswordModal = ({ open, onClose }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const email = localStorage.getItem("email");

  const handleTogglePasswordVisibility = (field) => {
    switch (field) {
      case "oldPassword":
        setShowOldPassword(!showOldPassword);
        break;
      case "newPassword":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirmNewPassword":
        setShowConfirmNewPassword(!showConfirmNewPassword);
        break;
      default:
        break;
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      if (newPassword !== confirmNewPassword) {
        setErrorMessage("Password not matched");
        return;
      }
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        "x-sh-auth": token,
      };
      const reqObj = {
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmNewPassword,
      };
      const response = await axios.put(
        `${apiUrl}api/app_api/change_password`,
        reqObj,
        {
          headers: headers,
        }
      );

      console.log("Password changed successfully", response.data);
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setErrorMessage("");
      onClose(); // Close the modal after password change
    } catch (error) {
      console.error("Error changing password:", error.response);
      setErrorMessage("Error changing password. Please try again.");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <h4>Change Password</h4>
        <h6>Email:<b> {email}</b></h6>
        <form onSubmit={handleChangePassword}>
          
          <TextField
            label="Old Password"
            type={showOldPassword ? "text" : "password"}
            fullWidth
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleTogglePasswordVisibility("oldPassword")}
                    edge="end"
                  >
                    {showOldPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }} // Add margin bottom here
          />

          <TextField
            label="New Password"
            type={showNewPassword ? "text" : "password"}
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleTogglePasswordVisibility("newPassword")}
                    edge="end"
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }} // Add margin bottom here
          />

          <TextField
            label="Confirm New Password"
            type={showConfirmNewPassword ? "text" : "password"}
            fullWidth
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleTogglePasswordVisibility("confirmNewPassword")}
                    edge="end"
                  >
                    {showConfirmNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }} // Add margin bottom here
          />

          <Button
            className="btn-clr"
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 2 }}
          >
            Change Password
          </Button>
        </form>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </Box>
    </Modal>
  );
};

export default ChangePasswordModal;
