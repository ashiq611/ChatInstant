import { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";



const UserList = () => {
  // realtime firebase
  const db = getDatabase();
  const [userList, setUserList] = useState([]);

  const data = useSelector((state) => state.userLoginInfo.userInfo);

// read data in realtime firebase
  useEffect(() => {
    const userRef = ref(db, "users");
    let list = [];
    onValue(userRef, (snapShot) => {
      snapShot.forEach((user) => {
        if (data.uid !== user.key) {
          list.push({
            ...user.val(),
            id: user.key,
          });
        }

        setUserList(list);
      });
    });
  }, [userList]);
  return (
    <div className="relative">
      <div className="sticky top-0 p-2 flex justify-between bg-base-100 z-10 ">
        <h1 className="head font-bold text-xl font-mono">Userlist</h1>
        <div className="text-2xl font-bold text-cyan-600 cursor-pointer">
          <HiDotsVertical />
        </div>
      </div>
      <div className="divide-y divide-blue-900 ">
        
{/* single */}
       {
        userList.map((user) => {
          return (
            <div key={user.id} className="flex justify-between px-5 py-2">
              <div className="left flex gap-5">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src={user.profile_picture} />
                  </div>
                </div>
                <div className="msg">
                  <div className="name font-bold text-base md:text-lg font-custom">
                    <h1>{user.username}</h1>
                  </div>
                  <div className="inbox text-sm md:text-base">
                    <p>hello..</p>
                  </div>
                </div>
              </div>
              <div className="right flex items-center gap-2 flex-wrap">
                <button className="btn btn-info btn-xs lg:btn-sm ">
                  Add Friend
                </button>
              </div>
            </div>
          );
          
        })
       }
        {/* single user */}

        
      </div>

      
    </div>
  );
};

export default UserList;
