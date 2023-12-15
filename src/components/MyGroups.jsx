import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { useSelector } from "react-redux";

const MyGroups = () => {
  const db = getDatabase();

   const data = useSelector((state) => state.userLoginInfo.userInfo);

   const [groupList, setGroupList] = useState([]);


  // read grp in realtime firebase
  useEffect(() => {
    const groupRef = ref(db, "groups");
    let list = [];
    onValue(groupRef, (snapShot) => {
      snapShot.forEach((grp) => {
        if (data.uid == grp.val().adminID) {
          list.push({
            ...grp.val(),
            id: grp.key,
          });
        }
        setGroupList(list);
      });
    });
  }, [data, db]);

  
  return (
    <div className="relative">
      <div className="sticky top-0 p-2 flex justify-between bg-base-100 z-10">
        <h1 className="head font-bold text-xl font-mono">My Groups</h1>
        <div className="text-2xl font-bold text-cyan-600 cursor-pointer">
          <HiDotsVertical />
        </div>
      </div>
      <div className="divide-y divide-blue-900 ">
        {groupList?.map((grp) => (
          <div key={grp.id} className="flex justify-between px-5 py-2">
            <div className="left flex gap-5">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src={grp.groupProfile} />
                </div>
              </div>
              <div className="msg">
                <div className="name font-bold text-base md:text-lg font-custom">
                  <h1>{grp.groupName}</h1>
                </div>
                <div className="inbox text-sm md:text-base">
                  <p>{grp.tagName}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyGroups;
