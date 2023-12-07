import { getDatabase, onValue, push, ref, remove, set,  } from "firebase/database";
import { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { useSelector } from "react-redux";

const FriendRequest = () => {
  const db = getDatabase();
  const [pendingReq, setPendingReq] = useState([])
 

  const data = useSelector((state) => state.userLoginInfo.userInfo);
  //  get friendreq list
  useEffect(() => {
    const friendRequestRef = ref(db, "friendRequest");
    onValue(friendRequestRef, (snapshot) => {
      
      let friendReq = []
      snapshot.forEach((req) => {
        if(req.val().receiverID === data.uid){
          friendReq.push({...req.val(), id: req.key})

        }
      });
      setPendingReq(friendReq);
      
    });

   
  }, [setPendingReq, db, data.uid]);
  
  // cancel req
  const handleFriendReqCancel = (req) => {
   
    remove(ref(db, "friendRequest/" + req.id))

  }


  // acept req
  const handdleFriendReqAcept = (req) => {
    console.log(req);
    set(push(ref(db, "friends")),{...req})
    .then(() => {
      remove(ref(db, "friendRequest/" + req.id));
    })

  }

  // console.log(pendingReq);
  return (
    <div className="relative">
      <div className="sticky top-0 p-2 flex justify-between bg-base-100 z-10 ">
        <h1 className="head font-bold text-xl font-mono">
          Friend Request{" "}
          <span className="badge badge-secondary">{pendingReq.length}</span>
        </h1>
        <div className="text-2xl font-bold text-cyan-600 cursor-pointer">
          <HiDotsVertical />
        </div>
      </div>
      <div className="divide-y divide-blue-900 ">
        {/* single */}
        {pendingReq?.map((r) => (
          <>
            <div key={r.id} className="flex justify-between px-5 py-2">
              <div className="left flex gap-5">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src={r.senderProfile} />
                  </div>
                </div>
                <div className="msg">
                  <div className="name font-bold text-base md:text-lg font-custom">
                    <h1>{r.senderName}</h1>
                  </div>
                  <div className="inbox text-sm md:text-base">
                    <p>hello..</p>
                  </div>
                </div>
              </div>
              <div className="right flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => handdleFriendReqAcept(r)}
                  className="btn btn-info btn-xs lg:btn-sm "
                >
                  Accept
                </button>
                <button
                  onClick={() =>
                    document.getElementById("my_modal_5").showModal()
                  }
                  className="btn btn-error btn-xs lg:btn-sm "
                >
                  Cancel
                </button>
              </div>
            </div>
            <div>
              {/* Open the modal using document.getElementById('ID').showModal() method */}
              {/* <button
                className="btn"
                onClick={() =>
                  document.getElementById("my_modal_5").showModal()
                }
              >
                open modal
              </button> */}
              <dialog
                id="my_modal_5"
                className="modal modal-bottom sm:modal-middle"
              >
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Hello!</h3>
                  <p className="py-4">
                    Are you want cancel{" "}
                    <span className="badge badge-secondary">{r.senderName}</span>
                    Friend Request?
                  </p>
                  <div className="modal-action">
                    <button
                      onClick={() => handleFriendReqCancel(r)}
                      className="btn"
                    >
                      Sure
                    </button>
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

export default FriendRequest;
