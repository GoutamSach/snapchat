import { Avatar } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import ReactTimeago from "react-timeago";
import { selectImage } from "./features/appSlice";
import SearchIcon from "@mui/icons-material/Search";
import { db } from "./firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router";

function ChatCard({ userName, timestamp, imageUrl, read, id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const open = () => {
    if (!read) {
      const docRef = doc(db, "posts/" + id);
      updateDoc(docRef, { read: true });
    }
    dispatch(selectImage(imageUrl));
    navigate("/View");
  };
  return (
    <div
      onClick={open}
      className={`border-b flex px-1 py-1 space-x-1 cursor-pointer items-center 
       ${!read && " font-bold"}`}
    >
      <div className="  scale-90">
        <Avatar src={imageUrl} />
      </div>
      <div className="  flex-grow">
        <h2 className={`text-sm  font-semibold ${!read && "font-bold"} `}>
          {userName}
        </h2>
        <div className=" text-xs">
          <p>
            Tap to view -{" "}
            <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} />
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChatCard;
