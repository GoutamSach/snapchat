import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectImage } from "./features/cameraSlice";
import { useNavigate } from "react-router";

function Preview() {
  const capturedImage = useSelector(selectImage);
  const navigate = useNavigate();

  useEffect(() => {
    if (!capturedImage) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <img src={capturedImage} alt="" />
    </div>
  );
}

export default Preview;


1:16