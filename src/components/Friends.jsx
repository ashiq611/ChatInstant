import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { useSelector } from "react-redux";

const Friends = () => {

  const db = getDatabase();
  const [friendList, setFriendList] = useState([]);

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

  }, [data.uid, db])



  const handleUnfriend = (friend) => {
      remove(ref(db, "friends/" + friend.id));
  }


  const handleBlock = (friend) => {

    set(push(ref(db, "blocked")), { ...friend })
    .then(() => {
      remove(ref(db, "friends/" + friend.id));
    });

  }




  return (
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
          <div key={f.id} className="flex justify-between px-5 py-2">
            <div className="left flex gap-5">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src={f.senderProfile} />
                </div>
              </div>
              <div className="msg">
                <div className="name font-bold text-base md:text-lg font-custom">
                  <h1>{f.senderName}</h1>
                </div>
                <div className="inbox text-sm md:text-base">
                  <p>hello..</p>
                </div>
              </div>
            </div>
            <div className="right flex items-center gap-2 flex-wrap">
              <button onClick={() => handleBlock(f)} className="btn btn-warning btn-xs lg:btn-sm ">
                Block
              </button>
              <button onClick={() => handleUnfriend(f)} className="btn btn-error btn-xs lg:btn-sm ">
                Unfriend
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friends;
