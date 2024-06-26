import React from "react";
import { Outlet } from "react-router";
import { styled } from "@mui/material";
import SideBar from "../Components/SideBar";



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
    paddingTop: APP_BAR_DESKTOP ,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export const PrivateLayout = () => {


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
