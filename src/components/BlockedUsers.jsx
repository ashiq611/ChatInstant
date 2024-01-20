import { getDatabase, onValue, ref, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { useSelector } from "react-redux";

const BlockedUsers = () => {

  const db = getDatabase();
  const [blockList, setBlockList] = useState([]);

  const data = useSelector((state) => state.userLoginInfo.userInfo);

  // get friendlist from firebase database
  useEffect(() => {
    const blockedRef = ref(db, "blocked");
    onValue(blockedRef, (snapshot) => {
      let blockeds = [];
      snapshot.forEach((friend) => {
        if (
          friend.val().blockByID === data.uid 
        ) {
          blockeds.push({ ...friend.val(), id: friend.key });
        }
      });
      setBlockList(blockeds);
    });
  }, [data.uid, db]);


  const handleUnblock = (block)=> {
    remove(ref(db, "blocked/" + block.id));
  }

  // console.log(blockList)


  return (
    <div className="relative">
      <div className="sticky top-0 p-2 flex justify-between bg-base-100 z-10">
        <h1 className="head font-bold text-xl font-mono">
          Blocked Users{" "}
          <span className="badge badge-secondary">{blockList?.length}</span>
        </h1>
        <div className="text-2xl font-bold text-cyan-600 cursor-pointer">
          <HiDotsVertical />
        </div>
      </div>
      <div className="divide-y divide-blue-900">
        {blockList?.map((b) => (
          <div key={b.id}>
            <div className="flex justify-between px-5 py-2">
              <div className="left flex gap-5">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src={b.blockProfile} />
                  </div>
                </div>
                <div className="msg">
                  <div className="name font-bold text-base md:text-lg font-custom">
                    <h1>{b.blockName}</h1>
                  </div>
                  <div className="inbox text-sm md:text-base">
                    <p>hello...</p>
                  </div>
                </div>
              </div>
              <div className="right flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => handleUnblock(b)}
                  className="btn btn-warning btn-xs lg:btn-sm "
                >
                  Unblock
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlockedUsers;
