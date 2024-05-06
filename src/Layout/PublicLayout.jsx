import React, { useEffect } from "react";
import { Outlet} from 'react-router-dom';
import { useNavigate } from "react-router-dom";


export const PublicLayout = () => {
  const navigate = useNavigate();

  const Token = () => {
    const token = localStorage.getItem("token");
    if (token && token !== null && token !== "undefined" && token !== "") {
      console.log(typeof token, 123);
      return true;
    }
    else{
      return false
    }
  };

  useEffect(() => {
    if (!Token()) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Outlet />
    </>

  )
};
