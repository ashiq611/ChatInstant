import { HiDotsVertical } from "react-icons/hi";
import { TbPhotoPlus } from "react-icons/tb";
import { MdOutlineInsertEmoticon } from "react-icons/md";
import ModalImage from "react-modal-image";
import { GrSend } from "react-icons/gr";
import {  useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import {
  getDownloadURL,
  getStorage,
  uploadBytes,
  ref as sref,
} from "firebase/storage";


const InboxChat = () => {
  const db = getDatabase();

  const storage = getStorage();

  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const activeChat = useSelector((state) => state.activeChatInfo.activeInfo);

  const [msg, setMsg] = useState("");
  const [msgList, setMsgList] = useState([]);
  const [msgListgrp, setMsgListgrp] = useState([]);
  const [image, setImage] = useState(null);

  const uploadImage = async () => {
    const storageRef = sref(storage, `msg/${image.name}`);
    await uploadBytes(storageRef, image);
    return getDownloadURL(storageRef);
  };

  const handleMsgSend = async () => {
    try {
      let imageUrl = null;

      if (image) {
        imageUrl = await uploadImage();
      }

      if (activeChat && activeChat?.status === "single") {
        set(push(ref(db, "singleMsg")), {
          whoSendID: data.uid,
          whoSendName: data.displayName,
          whoSendProfile: data.photoURL,
          whoReceiveID: activeChat.id,
          whoReceiveName: activeChat.name,
          whoReceiveProfile: activeChat.profile,
          msg: msg,
          img: imageUrl,
          date: `${new Date().getFullYear()}-${
            new Date().getMonth() + 1
          }-${new Date().getDate()}, 
          ${new Date().getHours() % 12}:${new Date().getMinutes()},${
            new Date().getHours() >= 12 ? "PM" : "AM"
          }`,
        })
          .then(() => {
            console.log("Message sent");
            setMsg("");
            setImage(null); // Clear the selected image after sending
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        // grp msg funtionality
        console.log("Group");

        set(push(ref(db, "grpMsg")), {
          whoSendID: data.uid,
          whoSendName: data.displayName,
          whoSendProfile: data.photoURL,
          whoReceiveID: activeChat.id,
          whoReceiveName: activeChat.name,
          whoReceiveProfile: activeChat.profile,
          msg: msg,
          img: imageUrl,
          date: `${new Date().getFullYear()}-${
            new Date().getMonth() + 1
          }-${new Date().getDate()}, 
          ${new Date().getHours() % 12}:${new Date().getMinutes()},${
            new Date().getHours() >= 12 ? "PM" : "AM"
          }`,
        })
          .then(() => {
            console.log("Message sent");
            setMsg("");
            setImage(null); // Clear the selected image after sending
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    onValue(ref(db, "singleMsg"), (snapshot) => {
      let list = [];
      snapshot.forEach((item) => {
        if (
          (item.val().whoSendID == data.uid &&
            item.val().whoReceiveID == activeChat?.id) ||
          (item.val().whoSendID == activeChat?.id &&
            item.val().whoReceiveID == data.uid)
        ) {
          list.push({ ...item.val(), key: item.key });
        }
      });
      setMsgList(list);
    });
  }, [activeChat?.id]);

  useEffect(() => {
    onValue(ref(db, "grpMsg"), (snapshot) => {
      let list = [];
      snapshot.forEach((item) => {
        
       if( item.val().whoReceiveID == activeChat?.id || item.val().whoSendID == activeChat?.id ){

         list.push({ ...item.val(), key: item.key });
       }
        
      });
      setMsgListgrp(list);
    });
  }, [activeChat?.id]);

  const fileInputRef = useRef(null);

  const handleCustomButtonClick = () => {
    // Trigger the hidden file input
    fileInputRef.current.click();
  };

  // console.log(msgListgrp);


 

  return (
    <div className="w-full h-full mx-auto md:h-[90vh]">
      
      {activeChat && (
        <div className="relative h-full">
          {/* Header */}
          <div className="sticky top-0 p-2 flex justify-between bg-base-100 z-10 ">
            <div className="left flex gap-2 md:gap-5">
              <div className="avatar">
                <div className="w-8 md:w-12 rounded-full">
                  <img alt="dp" src={activeChat?.profile} />
                </div>
              </div>
              <div className="msg">
                <div className="name font-bold text-sm md:text-lg font-custom">
                  <h2>{activeChat?.name}</h2>
                </div>
                <div className="inbox text-xs md:text-sm">
                  <p>Online</p>
                </div>
              </div>
            </div>
            <div className="text-xl font-bold text-cyan-600 cursor-pointer">
              <HiDotsVertical />
            </div>
          </div>

          {/* Message List */}
          <div className="overflow-y-auto h-full flex flex-col-reverse">
            {activeChat?.status === "single"
              ? msgList
                  .slice()
                  .reverse()
                  .map((item) => (
                    <div
                      key={item.key}
                      className={
                        item.whoSendID === data.uid
                          ? "chat chat-end"
                          : "chat chat-start"
                      }
                    >
                      <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                          <img
                            alt="Sender's avatar"
                            src={item.whoSendProfile}
                          />
                        </div>
                      </div>
                      <div className="chat-header">
                        {item.whoSendName}{" "}
                        <time className="text-xs opacity-50">{item.date}</time>
                      </div>
                      {item.msg && (
                        <div className="chat-bubble">{item.msg}</div>
                      )}
                      {item.img && (
                        <div className="chat-bubble">
                          <ModalImage
                            small={item.img}
                            large={item.img}
                            alt="Image message"
                            className="h-20"
                          />
                        </div>
                      )}
                      {item.whoSendID === data.uid ? (
                        <div className="chat-footer opacity-50">Delivered</div>
                      ) : (
                        ""
                      )}
                    </div>
                  ))
              : msgListgrp
                  .slice()
                  .reverse()
                  .map((item) => (
                    <div
                      key={item.key}
                      className={
                        item.whoSendID === data.uid
                          ? "chat chat-end"
                          : "chat chat-start"
                      }
                    >
                      <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                          <img
                            alt="Sender's avatar"
                            src={item.whoSendProfile}
                          />
                        </div>
                      </div>
                      <div className="chat-header">
                        {item.whoSendName}{" "}
                        <time className="text-xs opacity-50">{item.date}</time>
                      </div>
                      {item.msg && (
                        <div className="chat-bubble">{item.msg}</div>
                      )}
                      {item.img && (
                        <div className="chat-bubble">
                          <ModalImage
                            small={item.img}
                            large={item.img}
                            alt="Image message"
                            className="h-20"
                          />
                        </div>
                      )}
                      {item.whoSendID === data.uid ? (
                        <div className="chat-footer opacity-50">Delivered</div>
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
          </div>

          {/* Message Input */}
          <div className="sticky bottom-0 p-2 flex gap-2 lg:gap-5 justify-between items-center bg-base-100 z-10">
            <textarea
              onChange={(e) => setMsg(e.target.value)}
              value={msg}
              placeholder="Type your messages"
              className="textarea textarea-bordered textarea-xs w-full"
            ></textarea>
            <div className="flex gap-2 items-center">
              <div className="text-2xl ">
                <MdOutlineInsertEmoticon />
              </div>
              <div className="text-2xl hover:bg-green-700 hover:text-white rounded-lg p-2">
                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => setImage(e.target.files[0])}
                />
                {/* Custom button/icon */}
                <label onClick={handleCustomButtonClick}>
                  <TbPhotoPlus />
                </label>
              </div>
              <button
                disabled={!msg && !image}
                onClick={handleMsgSend}
                className="btn btn-success btn-sm"
              >
                Send <GrSend />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InboxChat;
