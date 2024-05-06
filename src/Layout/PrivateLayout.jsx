import React, { useEffect } from "react";
import { Outlet } from "react-router";
import { styled } from "@mui/material";
import SideBar from "../Components/SideBar";
import { useNavigate } from "react-router-dom";
import Dashboard from "../Components/DashBoard";


const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;



const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const Main = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export const PrivateLayout = () => {

  const navigate = useNavigate();

  const Token = () => {
    const token = localStorage.getItem("token");
    if (token && token != null || token != "undefined" || token != "") {
      console.log(typeof token, 123);
      return true;
    }
    else {
      return false
    }
  };

  useEffect(() => {
    console.log("privatelayout")
    if (Token()) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <>
      <StyledRoot>
        <SideBar />
        <Main>
          <Outlet />
        </Main>
      </StyledRoot>
    </>
  );
};
