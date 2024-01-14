import { HiDotsVertical } from "react-icons/hi";
import { TbPhotoPlus } from "react-icons/tb";
import { MdOutlineInsertEmoticon } from "react-icons/md";
import ModalImage from "react-modal-image";
import { GrSend } from "react-icons/gr";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDatabase, onValue, push, ref, set } from "firebase/database";

const InboxChat = () => {
  const db = getDatabase();
  // collect data from redux store
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const activeChat = useSelector((state) => state.activeChatInfo.activeInfo);

  const [msg, setMsg] = useState("");
  const [msgList, setMsgList] = useState([]);

  // send msg operation starts
  const handleMsgSend = () => {
    if (activeChat && activeChat?.status == "single") {
      set(push(ref(db, "singleMsg")), {
        whoSendID: data.uid,
        whoSendName: data.displayName,
        whoSendProfile: data.photoURL,
        whoReceiveID: activeChat.id,
        whoReceiveName: activeChat.name,
        whoReceiveProfile: activeChat.profile,
        msg: msg,
        date: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()}, 
        ${new Date().getHours() % 12}:${new Date().getMinutes()},${
          new Date().getHours() >= 12 ? "PM" : "AM"
        }`,
      })
        .then(() => {
          console.log("done");
          setMsg("");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("grp");
    }
  };
  // send msg operation ends

  useEffect(() => {
    onValue(ref(db, "singleMsg"), (snapshot) => {
      let list = [];
      snapshot.forEach((item) => {
        if (
          (item.val().whoSendID == data.uid &&
            item.val().whoReceiveID == activeChat.id) ||
          (item.val().whoSendID == activeChat.id &&
            item.val().whoReceiveID == data.uid)
        ) {
          list.push({ ...item.val(), key: item.key });
        }
      });
      setMsgList(list);
    });
  }, [activeChat?.id]);

  // console.log(msgList);
  return (
    <div className="w-full h-fit mx-auto md:h-[90vh]">
      {activeChat && (
        <div className="relative h-full">
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
          <div className="overflow-y-auto h-full flex flex-col-reverse">
            {/* Your chat content */}

            {activeChat?.status == "single" ? (
              msgList.slice().reverse().map((item) => {
                return item.whoSendID == data.uid ? (
                  <div key={item.key} className="chat  chat-end">
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img
                          alt="Tailwind CSS chat bubble component"
                          src={item.whoSendProfile}
                        />
                      </div>
                    </div>
                    <div className="chat-header">
                      {item.whoSendName} {""}
                      <time className="text-xs opacity-50">{item.date}</time>
                    </div>
                    <div className="chat-bubble">{item.msg}</div>
                    <div className="chat-footer opacity-50">Delivered</div>
                  </div>
                ) : (
                  <div key={item.key} className="chat chat-start">
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img
                          alt="Tailwind CSS chat bubble component"
                          src={item.whoSendProfile}
                        />
                      </div>
                    </div>
                    <div className="chat-header">
                      {item.whoSendName} {""}
                      <time className="text-xs opacity-50">{item.date}</time>
                    </div>
                    <div className="chat-bubble">{item.msg}</div>
                  </div>
                );
              })
            ) : (
              <h1>grp</h1>
            )}
          </div>
          <div className="sticky bottom-0 p-2 flex gap-2 lg:gap-5 justify-between items-center bg-base-100 z-10">
            <textarea
              onChange={(e) => setMsg(e.target.value)}
              value={msg}
              placeholder="Type your messages"
              className="textarea textarea-bordered textarea-xs w-full"
            ></textarea>
            <div className="flex gap-2">
              <div className="text-2xl">
                <MdOutlineInsertEmoticon />
              </div>
              <div className="text-2xl">
                <TbPhotoPlus />
              </div>
              <button
                disabled={msg ? false : true}
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

{
  /* <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <div className="chat-header">
              Obi-Wan Kenobi
              <time className="text-xs opacity-50">12:45</time>
            </div>
            <div className="chat-bubble">You were the Chosen One!</div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>
          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <div className="chat-header">
              Anakin
              <time className="text-xs opacity-50">12:46</time>
            </div>
            <div className="chat-bubble">I hate you!</div>
            <div className="chat-footer opacity-50">Seen at 12:46</div>
          </div>

          
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <div className="chat-header">
              Obi-Wan Kenobi
              <time className="text-xs opacity-50">12:45</time>
            </div>
            <div className="chat-bubble">
              
              <ModalImage
                className="h-20"
                small="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                large="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                alt="Hello World!"
              />
            </div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>
          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <div className="chat-header">
              Anakin
              <time className="text-xs opacity-50">12:46</time>
            </div>
            <div className="chat-bubble">I hate you!</div>
            <div className="chat-footer opacity-50">Seen at 12:46</div>
          </div> */
}
