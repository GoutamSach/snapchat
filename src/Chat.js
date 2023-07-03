import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import {
  collection,
  orderBy,
  query,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import ChatCard from "./ChatCard";
import { ref } from "firebase/database";
import { set } from "firebase/database";
import { selectImage } from "./features/appSlice";
import { useDispatch } from "react-redux";

function Chat({ id, imageUrl, read }) {
  const [posts, setPost] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const postFromDatabase = collection(db, "posts");
    const post = query(postFromDatabase, orderBy("timestamp", "desc"));
    onSnapshot(post, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        setPost(
          snapshot.docs.map((doc) => ({
            id: doc.id,

            data: doc.data(),
          }))
        );
      });
    });
  }, []);

  return (
    <>
      <div className=" flex  flex-col justify-center   ">
        <div className=" flex items-center h-14  justify-between w-80  bg-blue-500     ">
          <div className="">
            <Avatar className=" scale-75" />
          </div>
          <div className=" space-x-2 pl-2 text-white">
            <SearchIcon />
            <input
              type="text"
              className="pl-2 py-1 outline-none bg-transparent text-white placeholder:text-white"
              placeholder="Friends "
            />
          </div>
          <div className="pl-2 scale-75 text-white">
            <ChatBubbleIcon />
          </div>
        </div>
        <div className=" bg-white  h-[450px]  w-80 rounded-tl-2xl -mt-2 shadow-[1px_-5px_10px_2px_rgba(0,0,0,0.3)]  overflow-scroll no-scrollbar        ">
          {posts.map(
            ({ id, data: { imageUrl, userName, read, timestamp } }) => (
              <ChatCard
                key={id}
                userName={userName}
                imageUrl={imageUrl}
                timestamp={timestamp}
                id={id}
                read={read}
              />
            )
          )}
        </div>
      </div>
    </>
  );
}

export default Chat;
