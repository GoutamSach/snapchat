import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { collection, orderBy, query, onSnapshot } from "firebase/firestore";
import { auth, db } from "./firebase";
import ChatCard from "./ChatCard";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { logout, userLogin } from "./features/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router";

function Chat() {
  const [posts, setPost] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector(userLogin);
  const navigate = useNavigate();

  const goToCamera = () => {
    navigate("/Webcamapp");
  };

  const signout = () => {
    signOut(auth)
      .then(dispatch(logout()))
      .catch((error) => {
        alert(error.message);
      });
  };

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
      <div className=" flex  flex-col justify-center relative left-[2px]    ">
        <div className=" flex items-center h-14  justify-between w-80  bg-blue-500     ">
          <div className="" onClick={() => signout()}>
            <Avatar src={user.photoUrl} className=" scale-75" />
          </div>
          <div className=" space-x-2 pl-2 text-white">
            <SearchIcon />
            <input
              type="text"
              className="pl-2 py-1 outline-none bg-transparent text-white placeholder:text-white"
              placeholder="Friends "
            />
          </div>
          <div className="px-2 scale-75 text-white">
            <ChatBubbleIcon />
          </div>
        </div>
        <div className=" bg-white  h-[450px]  w-80 rounded-tl-2xl -mt-2 shadow-[1px_-5px_10px_2px_rgba(0,0,0,0.3)]  overflow-scroll no-scrollbar        ">
          {posts.map(({ id, data: { read, timestamp, imageUrl } }) => (
            <ChatCard
              key={id}
              userName={user.displayName}
              photoUrl={user.photoUrl}
              timestamp={timestamp}
              id={id}
              read={read}
              imageUrl={imageUrl}
            />
          ))}
        </div>
        <RadioButtonUncheckedIcon
          className="  bg-white rounded-full scale-150 absolute cursor-pointer bottom-12 right-[150px] text-gray-700     "
          onClick={goToCamera}
        />
      </div>
    </>
  );
}

export default Chat;
