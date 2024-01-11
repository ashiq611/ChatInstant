import {
  getDatabase,
  onValue,

  ref,

} from "firebase/database";
import { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { activeChatInfo } from "../slices/activeChatSlice";

const InboxFriendList = () => {
  const db = getDatabase();
  const [friendList, setFriendList] = useState([]);
  const dispatch = useDispatch();

  const data = useSelector((state) => state.userLoginInfo.userInfo);

  // get friendlist from firebase database
  useEffect(() => {
    const friendRef = ref(db, "friends");
    onValue(friendRef, (snapshot) => {
      let friends = [];
      snapshot.forEach((friend) => {
        if (
          friend.val().receiverID === data.uid ||
          friend.val().senderID === data.uid
        ) {
          friends.push({ ...friend.val(), id: friend.key });
        }
      });
      setFriendList(friends);
    });
  }, [data.uid, db]);

  // active frined start
  const handleActiveFriend = (f) => {
    if(f.receiverID == data.uid){
      dispatch(
        activeChatInfo({
          status: "single",
          id: f.senderID,
          name: f.senderName,
          profile: f.senderProfile,
        })
        );
        localStorage.setItem(
          "activeFriend",
          JSON.stringify({
            status: "single",
            id: f.senderID,
            name: f.senderName,
            profile: f.senderProfile,
          })
        );

    }else{
      dispatch(
        activeChatInfo({
          status: "single",
          id: f.receiverID,
          name: f.receiverName,
          profile: f.receiverProfile,
        })
      );
      localStorage.setItem(
        "activeFriend",
        JSON.stringify({
          status: "single",
          id: f.receiverID,
          name: f.receiverName,
          profile: f.receiverProfile,
        })
      );
    }

  };
  // active frined ends
  return (
    <div>
      <div className="relative">
        <div className="sticky top-0 p-2 flex justify-between bg-base-100 z-10 ">
          <h1 className="head font-bold text-xl font-mono">Friends</h1>
          <div className="text-2xl font-bold text-cyan-600 cursor-pointer">
            <HiDotsVertical />
          </div>
        </div>
        <div className="divide-y divide-blue-900 ">
          {/* single */}

          {friendList?.map((f) => (
            <div
              key={f.id}
              onClick={() => handleActiveFriend(f)}
              className="flex justify-between px-5 py-2 cursor-pointer hover:bg-slate-400"
            >
              <div className="left flex gap-5">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    {data.uid == f.senderID ? (
                      <img src={f.receiverProfile} />
                    ) : (
                      <img src={f.senderProfile} />
                    )}
                  </div>
                </div>
                <div className="msg">
                  <div className="name font-bold text-base md:text-lg font-custom">
                    {data.uid == f.senderID ? (
                      <h1>{f.receiverName}</h1>
                    ) : (
                      <h1>{f.senderName}</h1>
                    )}
                  </div>
                  <div className="inbox text-sm md:text-base">
                    <p>hello..</p>
                  </div>
                </div>
              </div>
              <div className="right flex items-center gap-2 flex-wrap">
                {/* <button
                  onClick={() => handleBlock(f)}
                  className="btn btn-warning btn-xs lg:btn-sm "
                >
                  Block
                </button>
                <button
                  onClick={() => handleUnfriend(f)}
                  className="btn btn-error btn-xs lg:btn-sm "
                >
                  Unfriend
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InboxFriendList;
