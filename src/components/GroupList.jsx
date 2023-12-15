import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";

const GroupList = () => {
  const db = getDatabase();
  const [groupName, setGroupName] = useState("");
  const [tagName, setTagName] = useState("");
  const [profileLink, setProfileLink] = useState("");
  const data = useSelector((state) => state.userLoginInfo.userInfo);

  const [groupList, setGroupList] = useState([])

  const handleGroupName = (e) => {
    setGroupName(e.target.value);
  };
  const handleTagName = (e) => {
    setTagName(e.target.value);
  };

  const handleProfileLink = (e) => {
    setProfileLink(e.target.value);
  };

  const handleCreate = (e) => {
    e.preventDefault();

    if (groupName == "") {
      alert("No groupname");
    } else if (tagName == "") {
      alert("No tagname");
    } else {
      console.log("hello");
      set(push(ref(db, "groups")), {
        groupName: groupName,
        tagName: tagName,
        groupProfile: profileLink,
        adminName: data.displayName,
        adminID: data.uid,
        adminProfile: data.photoURL,
      });
    }
  };

  // read grp in realtime firebase
  useEffect(() => {
    const groupRef = ref(db, "groups");
    let list = [];
    onValue(groupRef, (snapShot) => {
      snapShot.forEach((grp) => {
        if (data.uid !== grp.val().adminID) {
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
      <div>
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <form onSubmit={handleCreate}>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Enter Your Group Name</span>
                </div>
                <input
                  onChange={handleGroupName}
                  value={groupName}
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
                <div className="label">
                  <span className="label-text-alt">Bottom Left label</span>
                </div>
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">
                    Enter Your Group Pricture Link
                  </span>
                </div>
                <input
                  onChange={handleProfileLink}
                  value={profileLink}
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
                <div className="label">
                  <span className="label-text-alt">Bottom Left label</span>
                </div>
              </label>

              <label className="form-control">
                <div className="label">
                  <span className="label-text">Tag Name</span>
                </div>
                <textarea
                  onChange={handleTagName}
                  value={tagName}
                  className="textarea textarea-bordered h-24"
                  placeholder="Bio"
                ></textarea>
                <div className="label">
                  <span className="label-text-alt">Your bio</span>
                </div>
              </label>
              <input className="btn" type="submit" value="Create" />
            </form>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      <div className="sticky top-0 p-2 flex justify-between bg-base-100 z-10 ">
        <h1 className="head font-bold text-xl font-mono">Group List</h1>
        <div className="text-2xl font-bold text-cyan-600 cursor-pointer">
          <button
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            <FaUserPlus />
          </button>
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
                  <p>{grp.adminName}</p>
                </div>
              </div>
            </div>
            <div className="right flex items-center gap-2 flex-wrap">
              <button className="btn btn-info btn-xs lg:btn-sm ">Join</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupList;
