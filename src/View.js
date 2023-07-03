import React, { useEffect } from "react";
import { selectSelectedImage } from "./features/appSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ClearIcon from "@mui/icons-material/Clear";

function View() {
  const capturedImage = useSelector(selectSelectedImage);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!capturedImage) {
  //     exit();
  //   }
  // }, [capturedImage]);

  const exit = () => {
    navigate("/Chat");
  };
  return (
    <div>
      <img src={capturedImage} onClick={exit} alt="" />
      <ClearIcon />
      sign
    </div>
  );
}

export default View;
