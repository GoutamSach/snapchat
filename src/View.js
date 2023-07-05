import React, { useEffect } from "react";
import { selectSelectedImage } from "./features/appSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ClearIcon from "@mui/icons-material/Clear";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { selectImage } from "./features/cameraSlice";

function View() {
  const capturedImage = useSelector(selectImage);
  const navigate = useNavigate();

  const exit = () => {
    navigate("/");
  };
  return (
    <>
      <div className=" relative">
        <div className=" absolute right-5 top-5">
          <CountdownCircleTimer
            isPlaying
            duration={10}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[7, 5, 2, 0]}
            size={50}
            strokeWidth={6}
          >
            {({ remainingTime }) => {
              if (remainingTime === 0) {
                exit();
              }
              return remainingTime;
            }}
          </CountdownCircleTimer>
        </div>
        <div className="">
          <img
            src={capturedImage}
            onClick={exit}
            alt=""
            className=" cursor-pointer"
          />
        </div>
      </div>
    </>
  );
}

export default View;
