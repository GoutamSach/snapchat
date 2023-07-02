import React, { useState } from "react";
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useDispatch } from "react-redux";
import { setCameraImage } from "./features/cameraSlice";
import { useNavigate } from "react-router";

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: "user",
};

function Webcamapp() {
  const dispatch = useDispatch();
  const webcamRef = React.useRef(null);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    dispatch(setCameraImage(imageSrc));
    navigate("/Preview");
  }, [webcamRef]);

  return (
    <>
      <div className=" flex  flex-col  items-center justify-center relative ">
        <Webcam
          audio={false}
          height={400}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={250}
          videoConstraints={videoConstraints}
        />
        <div className="  absolute  bottom-5 ">
          <button onClick={capture} className="">
            <RadioButtonUncheckedIcon className=" text-white scale-150 cursor-pointer " />
          </button>
        </div>
      </div>
    </>
  );
}

export default Webcamapp;
