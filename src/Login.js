import React from "react";
import { useDispatch } from "react-redux";
import images from "./image/images.png";
import { Button } from "@mui/material";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import { login } from "./features/appSlice";

function Login() {
  const dispatch = useDispatch();
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch(
          login({
            id: result.user.uid,
            displayName: result.user.displayName,
            photoUrl: result.user.photoURL,
          })
        );
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div>
      <div className=" flex flex-col  =  items-center space-y-10   w-16 ">
        <img src={images} className="  " alt="" />
        <Button
          variant="outlined"
          className=" w-72 text-white"
          onClick={signIn}
        >
          Sign in
        </Button>
      </div>
    </div>
  );
}

export default Login;
