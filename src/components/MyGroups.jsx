import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { useSelector } from "react-redux";

const MyGroups = () => {
  const db = getDatabase();

  const data = useSelector((state) => state.userLoginInfo.userInfo);

  const [groupList, setGroupList] = useState([]);
  const [joinReq, setJoinReq] = useState([]);
  const [joinReqForGroup, setJoinReqForGroup] = useState([]);
  const [grpMembers, setgrpMembers] = useState([]);
  const [members, setMembers] = useState([])

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

  // show join req in grp
  useEffect(() => {
    const friendRequestRef = ref(db, "groupJoinReq");
    onValue(friendRequestRef, (snapshot) => {
      let grpJoinReq = [];
      snapshot.forEach((req) => {
        grpJoinReq.push({ ...req.val(), id: req.key });
      });
      setJoinReq(grpJoinReq);
    });
  }, [db]);

  // show member in grp
  useEffect(() => {
    const friendRequestRef = ref(db, "groupMembers");
    onValue(friendRequestRef, (snapshot) => {
      let grpmember = [];
      snapshot.forEach((member) => {
        grpmember.push({ ...member.val(), id: member.key });
      });
      setMembers(grpmember);
    });
  }, [db]);

  // handle req acept in grp

  const handleGrpReqAcept = (request) => {
    console.log(request);
    set(push(ref(db, "groupMembers")), {
      groupID: request.groupID,
      groupName: request.groupName,
      tagName: request.tagName,
      groupProfile: request.groupProfile,
      privacy: request.privacy,
      adminName: request.adminName,
      adminID: request.adminID,
      adminProfile: request.adminProfile,
      senderID: request.senderID,
      senderName: request.senderName,
      senderProfile: request.senderProfile,
    }).then(() => {
      remove(ref(db, "groupJoinReq/" + request.id));
    });

    // Update joinReqForGroup after canceling the request
    setJoinReqForGroup((prevRequests) =>
      prevRequests.filter((r) => r.id !== request.id)
    );
  };

  const handleGrpReqCancel = (request) => {
    remove(ref(db, "groupJoinReq/" + request.id));

    // Update joinReqForGroup after canceling the request
    setJoinReqForGroup((prevRequests) =>
      prevRequests.filter((r) => r.id !== request.id)
    );
  };

  // remove group member
  const handleGrpMemberRemove = (member)=> {
    remove(ref(db, "groupMembers/" + member.id));

    // Update joinReqForGroup after canceling the request
    setgrpMembers((prevRequests) =>
      prevRequests.filter((m) => m.id !== member.id)
    );
  }

// delete grp handle

  const handleGrpDelete = (grp) => {
    console.log(grp);

    // Delete from the "groups" collection
    remove(ref(db, `groups/${grp.id}`));

    // Delete related entries from the "groupMembers" collection
    const groupMembersRef = ref(db, "groupMembers");
    onValue(groupMembersRef, (snapshot) => {
      snapshot.forEach((member) => {
        if (member.val().groupID === grp.id) {
          remove(ref(db, `groupMembers/${member.key}`));
        }
      });
    });

    // Delete related entries from the "groupJoinReq" collection
    const groupJoinReqRef = ref(db, "groupJoinReq");
    onValue(groupJoinReqRef, (snapshot) => {
      snapshot.forEach((request) => {
        if (request.val().groupID === grp.id) {
          remove(ref(db, `groupJoinReq/${request.key}`));
        }
      });
    });
  };


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
                <div className="indicator">
                  {joinReqForGroup.length > 0 && (
                    <span className="indicator-item indicator-start badge badge-secondary">
                      {joinReqForGroup.length}
                    </span>
                  )}

                  <button
                    // onClick={() => {
                    //   // Update the state to store the join requests for the specific group
                    //   const groupJoinRequests = joinReq.filter(
                    //     (g) => g.groupID === grp.id
                    //   );
                    //   setJoinReqForGroup(groupJoinRequests);

                    //   // Show the modal
                    //   document.getElementById("my_modal_1").showModal();
                    // }}
                    onClick={() => {
                      // Check if the current user is the admin before processing the join request
                      if (data.uid === grp.adminID) {
                        // Update the state to store the join requests for the specific group
                        const groupJoinRequests = joinReq.filter(
                          (g) => g.groupID === grp.id
                        );
                        setJoinReqForGroup(groupJoinRequests);

                        // Show the modal
                        document
                          .getElementById(`my_modal_1_${grp.id}`)
                          .showModal();
                      } else {
                        // Display an error or notification that only the admin can view and approve join requests
                        console.error(
                          "Only the group admin can view and approve join requests."
                        );
                      }
                    }}
                    className="btn btn-info btn-xs lg:btn-sm "
                  >
                    Request
                  </button>
                </div>
                <button
                  onClick={() => {
                    // Check if the current user is the admin before processing the join request
                    if (data.uid === grp.adminID) {
                      // Update the state to store the join requests for the specific group
                      const groupMemberList = members.filter(
                        (m) => m.groupID === grp.id
                      );
                      setgrpMembers(groupMemberList);

                      // Show the modal
                      document
                        .getElementById(`my_modal_2_${grp.id}`)
                        .showModal();
                    } else {
                      // Display an error or notification that only the admin can view and approve join requests
                      console.error(
                        "Only the group admin can view and approve join requests."
                      );
                    }
                  }}
                  className="btn btn-error btn-xs lg:btn-sm "
                >
                  Info
                </button>
              </div>
            </div>
            <div>
              <dialog
                //
                id={`my_modal_1_${grp.id}`}
                className="modal modal-bottom sm:modal-middle"
              >
                <div className="modal-box">
                  {joinReqForGroup.map((request) => (
                    <div key={request.id}>
                      <div className="flex justify-between px-5 py-2">
                        <div className="left flex gap-5">
                          <div className="avatar">
                            <div className="w-12 rounded-full">
                              <img src={request.senderProfile} />
                            </div>
                          </div>
                          <div className="msg">
                            <div className="name font-bold text-base md:text-lg font-custom">
                              <h1>{request.senderName}</h1>
                            </div>
                            <div className="inbox text-sm md:text-base">
                              <p>hello..</p>
                            </div>
                          </div>
                        </div>
                        <div className="right flex items-center gap-2 flex-wrap">
                          <button
                            onClick={() => handleGrpReqAcept(request)}
                            className="btn btn-info btn-xs lg:btn-sm "
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleGrpReqCancel(request)}
                            className="btn btn-error btn-xs lg:btn-sm "
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
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
                // id="my_modal_2"
                id={`my_modal_2_${grp.id}`}
                className="modal modal-bottom sm:modal-middle"
              >
                <div className="modal-box">
                  <div>
                    <button onClick={() => handleGrpDelete(grp)}>Delete</button>

                    {grpMembers.map((member) => (
                      <div key={member.id}>
                        <div className="flex justify-between px-5 py-2">
                          <div className="left flex gap-5">
                            <div className="avatar">
                              <div className="w-12 rounded-full">
                                <img src={member.senderProfile} />
                              </div>
                            </div>
                            <div className="msg">
                              <div className="name font-bold text-base md:text-lg font-custom">
                                <h1>{member.senderName}</h1>
                              </div>
                              <div className="inbox text-sm md:text-base">
                                <p>hello..</p>
                              </div>
                            </div>
                          </div>
                          <div className="right flex items-center gap-2 flex-wrap">
                            <button
                              onClick={() => handleGrpMemberRemove(member)}
                              className="btn btn-error btn-xs lg:btn-sm "
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
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
