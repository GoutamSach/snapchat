import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetCameraImage, selectImage } from "./features/cameraSlice";
import { useNavigate } from "react-router";
import CloseIcon from "@mui/icons-material/Close";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import CreateIcon from "@mui/icons-material/Create";
import NoteIcon from "@mui/icons-material/Note";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CropIcon from "@mui/icons-material/Crop";
import TimerIcon from "@mui/icons-material/Timer";
import SendIcon from "@mui/icons-material/Send";
import { v4 } from "uuid";
import { db, storage } from "./firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";

function Preview() {
  const capturedImage = useSelector(selectImage);
  const images = capturedImage;

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const DataUrl = `data:image/jpeg;base64,${capturedImage}`;

  const sendPost = () => {
    const id = v4();
    const upload = ref(storage, `posts/${id}`);
    uploadString(upload, capturedImage, "data_url").then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        const posts = collection(db, "posts");
        setDoc(doc(posts), {
          imageUrl: url,
          userName: "goutam",
          read: false,
          timestamp: serverTimestamp(),
        });
        navigate("/Chat");
      });
    });

    // const pushtoDatabase = (downloadURL) => {
    //   const post = collection(db, "post");
    //   setDoc(doc(post), {
    //     imageURl: downloadURL,
    //     userName: "goutam",
    //     read: false,
    //     timestamp: serverTimestamp(),
    //   });
    // };
  };

  const closePreview = () => {
    dispatch(resetCameraImage());
    navigate("/");
  };

  useEffect(() => {
    if (!capturedImage) {
      navigate("/");
    }
  }, []);

  return (
    <div className="cursor-pointer  relative">
      <CloseIcon
        className=" text-white absolute top-3 left-3    "
        onClick={closePreview}
      />
      <div className="text-white flex cursor-pointer flex-col absolute  right-3 top-3 space-y-1 scale-90">
        <TextFieldsIcon />
        <CreateIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
      </div>
      <img src={capturedImage} alt="" className=" " />
      <div
        className=" flex absolute  bottom-3 right-3 cursor-pointer rounded-full bg-yellow-300 px-2 py-1 hover:scale-105"
        onClick={sendPost}
      >
        <h2>Send </h2>
        <SendIcon className="  scale-75" />
      </div>
    </div>
  );
}

export default Preview;
