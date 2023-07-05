import React from "react";
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useDispatch } from "react-redux";
import { setCameraImage } from "./features/cameraSlice";
import { useNavigate } from "react-router";

const videoConstraints = {
  height: "450",
  width: "300",
  facingMode: "user",
};

function Webcamapp() {
  const dispatch = useDispatch();
  const webcamRef = React.useRef(null);
  // const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    dispatch(setCameraImage(imageSrc));
    navigate("/Preview");
  }, [webcamRef]);

  return (
    <>
      <div className=" flex  flex-col  items-center justify-center relative w-[350px]  ">
        <div className=" absolute  w-96 h-96 top-6 left-[2px] ">
          <Webcam
            className=""
            audio={false}
            height={700}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={320}
            videoConstraints={videoConstraints}
          />
        </div>
        <div className="  absolute    top-[410px] left-[150px] ">
          <button onClick={capture} className="">
            <RadioButtonUncheckedIcon className=" text-blue-700  scale-150 cursor-pointer " />
          </button>
        </div>
      </div>
    </>
  );
}

export default Webcamapp;
