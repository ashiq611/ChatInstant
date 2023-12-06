import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { useSelector } from "react-redux";

const FriendRequest = () => {
  const db = getDatabase();
  const [pendingReq, setPendingReq] = useState([])

  const data = useSelector((state) => state.userLoginInfo.userInfo);

  useEffect(() => {
    const friendRequestRef = ref(db, "friendRequest");
    onValue(friendRequestRef, (snapshot) => {
      let friendRequest = [];
      snapshot.forEach((req) => {
        if(req.val().receiverID == data.uid){
          const reqUser = ref(db, `/users/${req.val().senderID}/`);
          onValue(reqUser, (user) => {
            
            friendRequest.push(user.val())
          })
        }
      });
      setPendingReq(friendRequest);
    });

   
  }, [setPendingReq, db, data.uid]);

  // console.log(pendingReq)
  return (
    <div className="relative">
      <div className="sticky top-0 p-2 flex justify-between bg-base-100 z-10 ">
        <h1 className="head font-bold text-xl font-mono">Friend Request</h1>
        <div className="text-2xl font-bold text-cyan-600 cursor-pointer">
          <HiDotsVertical />
        </div>
      </div>
      <div className="divide-y divide-blue-900 ">
        {/* single */}
        {pendingReq?.map((r) => (
          <div key={r.senderID} className="flex justify-between px-5 py-2">
            <div className="left flex gap-5">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src={r.profile_picture} />
                </div>
              </div>
              <div className="msg">
                <div className="name font-bold text-base md:text-lg font-custom">
                  <h1>{r.username}</h1>
                </div>
                <div className="inbox text-sm md:text-base">
                  <p>hello..</p>
                </div>
              </div>
            </div>
            <div className="right flex items-center gap-2 flex-wrap">
              <button className="btn btn-info btn-xs lg:btn-sm ">Accept</button>
              <button className="btn btn-error btn-xs lg:btn-sm ">
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendRequest;
