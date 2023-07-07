import React, { useEffect } from "react";
import { selectSelectedImage } from "./features/appSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { CountdownCircleTimer } from "react-countdown-circle-timer";

function View({ imageUrl }) {
  const navigate = useNavigate();
  const imageUrlfromState = useSelector(selectSelectedImage);

  const exit = () => {
    navigate("/");
  };
  return (
    <>
      <div className=" relative">
        <div
          className=" absolute left-56 top-12 z-50
        "
        >
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
        <div className="  relative top-4  left-[2px] z-10">
          <img
            src={imageUrlfromState}
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
