import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { useSelector } from "react-redux";

const MyGroups = () => {
  const db = getDatabase();

   const data = useSelector((state) => state.userLoginInfo.userInfo);

   const [groupList, setGroupList] = useState([]);


  // read grp in realtime firebase
  // useEffect(() => {
  //   const groupRef = ref(db, "groups");
  //   let list = [];
  //   onValue(groupRef, (snapShot) => {
  //     snapShot.forEach((grp) => {
  //       if (data.uid == grp.val().adminID) {
  //         list.push({
  //           ...grp.val(),
  //           id: grp.key,
  //         });
  //       }
  //     });
  //     setGroupList(list);
  //   });
    
  // }, [data.uid,db]);

  useEffect(() => {
    const groupRef = ref(db, "groups");

    const fetchData = (snapshot) => {
      let list = [];
      snapshot.forEach((grp) => {
        if (data.uid == grp.val().adminID) {
          list.push({
            ...grp.val(),
            id: grp.key,
          });
        }
      });
      // Clear the state before updating to prevent duplicates
      setGroupList([]);

      // Use functional update to ensure correct state update
      setGroupList((prevList) => [...prevList, ...list]);
    };

    // Attach the listener
    const unsubscribe = onValue(groupRef, fetchData);

    // Detach the listener after the initial data fetch
    return () => unsubscribe();
  }, [data.uid, db]);

  
  




  
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
          <>
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
              <div className="right flex items-center gap-2 flex-wrap">
                <button
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                  className="btn btn-info btn-xs lg:btn-sm "
                >
                  Request
                </button>
                <button
                  onClick={() =>
                    document.getElementById("my_modal_2").showModal()
                  }
                  className="btn btn-error btn-xs lg:btn-sm "
                >
                  Info
                </button>
              </div>
            </div>
            <div>
              <dialog
                id="my_modal_1"
                className="modal modal-bottom sm:modal-middle"
              >
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Hello!</h3>
                  <p className="py-4">
                    Press ESC key or click the button below to close
                  </p>
                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn">Close</button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
            <div>
              <dialog
                id="my_modal_2"
                className="modal modal-bottom sm:modal-middle"
              >
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Hello!</h3>
                  <p className="py-4">
                    Press ESC key or click the button below to close
                  </p>
                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn">Close</button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default MyGroups;
