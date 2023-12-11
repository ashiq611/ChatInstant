import { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from "react-redux";




const UserList = () => {
  // realtime firebase
  const db = getDatabase();
  const [userList, setUserList] = useState([]);
  const [friendRequestList, setfriendRequestList] = useState([]);
  const [friendList, setFriendList] = useState([])
  const [blockedList, setBlockedList] = useState([])

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
  }, [data, db]);


  // send friend request starts
  const handleFriendReq = (user) => {
    console.log(user);
    set(push(ref(db, "friendRequest")), {
      senderID: data.uid,
      senderName: data.displayName,
      senderProfile: data.photoURL,
      receiverID: user.id,
      receiverName: user.username,
      receiverProfile: user.profile_picture,
    });

    // user notification
    // Record the notification Date
    const loggedInDate = new Date().toISOString();

    set(push(ref(db, "notifications")), {
      userID: user.id,
      note: `${data.displayName} send you friend Request`,
      loggedInDate: loggedInDate, // Add the Logged In Date
    });
    // user notifications
  }

  useEffect(() => {
    const friendRequestRef = ref(db, "friendRequest");
    onValue(friendRequestRef, (snapshot) => {
      let friendRequest = [];
      snapshot.forEach((req) => {
        friendRequest.push(req.val().receiverID + req.val().senderID)

      })
      setfriendRequestList(friendRequest);

    })

  }, [setfriendRequestList,db])
  // console.log(userList);
  // send friend request ends


  // friends datta check
  useEffect(() => {
    const friendListRef = ref(db, "friends");
    onValue(friendListRef, (snapshot) => {
      let friendList = [];
      snapshot.forEach((friend) => {
        friendList.push(friend.val().receiverID + friend.val().senderID);
      })
      setFriendList(friendList)


    });

  },[db])


  // block data check
   useEffect(() => {
     const blockListRef = ref(db, "blocked");
     onValue(blockListRef, (snapshot) => {
       let blockList = [];
       snapshot.forEach((friend) => {
         blockList.push(
         friend.val().blockID + friend.val().blockByID
         );
       });
       setBlockedList(blockList);
     });
   }, [db]);


console.log(blockedList);



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
                    <p>{user.email}</p>
                  </div>
                </div>
              </div>
              <div className="right flex items-center gap-2 flex-wrap">
                {friendList.includes(user.id + data.uid) ||
                friendList.includes(data.uid + user.id) ? (
                  <button className="btn btn-warning btn-xs lg:btn-sm ">
                    Friend
                  </button>
                ) : (
                  <>
                    {friendRequestList.includes(user.id + data.uid) ||
                    friendRequestList.includes(data.uid + user.id) ? (
                      <button className="btn btn-secondary btn-xs lg:btn-sm ">
                        Request Send...
                      </button>
                    ) : (
                      <>
                        {blockedList.includes(user.id + data.uid) ||
                        blockedList.includes(data.uid + user.id) ? (
                          <button className="btn btn-warning btn-xs lg:btn-sm ">
                            Blocked
                          </button>
                        ) : (
                          <button
                            onClick={() => handleFriendReq(user)}
                            className="btn btn-info btn-xs lg:btn-sm "
                          >
                            Add Friend
                          </button>
                        )}{" "}
                      </>
                    )}
                  </>
                )}
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
