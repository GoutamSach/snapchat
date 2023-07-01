import { Route, Routes } from "react-router";
import "./App.css";
import Webcamapp from "./Webcamapp";
import Preview from "./Preview";

function App() {
  return (
    <div className=" bg-yellow-300  h-screen w-screen items-center justify-center flex flex-col">
      <Routes>
        <Route path="/" element={<Webcamapp />} />
      </Routes>
      <Routes>
        <Route path="/Preview" element={<Preview />} />
      </Routes>
    </div>
  );
}

export default App;
