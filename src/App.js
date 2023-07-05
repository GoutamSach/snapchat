import { Route, Routes } from "react-router";
import "./App.css";
import Webcamapp from "./Webcamapp";
import Preview from "./Preview";
import Chat from "./Chat";
import View from "./View";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, userLogin } from "./features/appSlice";
import Login from "./Login";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import phone from "./image/phone.png";

function App() {
  const user = useSelector(userLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            email: user.email,
            displayName: user.displayName,

            photoUrl: user.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [onAuthStateChanged]);

  return (
    <div className=" bg-yellow-300  h-screen w-screen items-center justify-center flex flex-col">
      {!user ? (
        <Login />
      ) : (
        <>
          <div className=" relative">
            <div
              style={{
                position: " ",
                backgroundImage: `url(${phone})`,
                backgroundSize: "contain",

                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "680px",
                width: "450px",
              }}
            >
              <div className=" absolute  left-16 top-20 ">
                <Routes>
                  <Route path="/" element={<Chat />} />
                </Routes>
                <Routes>
                  <Route path="/View" element={<View />} />
                </Routes>
                <Routes>
                  <Route path="/Webcamapp" element={<Webcamapp />} />
                </Routes>
                <Routes>
                  <Route path="/Preview" element={<Preview />} />
                </Routes>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
