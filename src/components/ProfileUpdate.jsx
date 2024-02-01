import { FaCloudUploadAlt } from "react-icons/fa";
import ChangeProfie from "./ChangeProfie";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getAuth, updatePassword, updateProfile } from "firebase/auth";
import { getDatabase, ref , set } from "firebase/database";
import { toast } from "react-toastify";
import { userLoginInfo } from "../slices/userSlice";
import { activeChatInfo } from "../slices/activeChatSlice";
import { useNavigate } from "react-router-dom";


const ProfileUpdate = () => {
  const auth = getAuth();
    const database = getDatabase();

    const dispatch = useDispatch()
    const navigate = useNavigate();

  const data = useSelector((state) => state.userLoginInfo.userInfo);


  const [changeName, setChangeName] = useState("");
  const [changePass, setChangePass] = useState("");
  const [changeConfirmPass, setChangeConfirmPass] = useState("");


    const handleName = (e) => {
      setChangeName(e.target.value);
    };

    const handlePass = (e) => {
      setChangePass(e.target.value);
    };

     const handleConfirmPass = (e) => {
       setChangeConfirmPass(e.target.value);
     };


    const handleSubmitName = (e)=> {
      e.preventDefault();

      if (changeName === "") {
        toast.warn("Put Your Name");
      }else{
        updateProfile(auth.currentUser, {
          displayName: changeName,
        }).then(()=> {
          //  update profile in realtime db
          const databaseRef = ref(
            database,
            `/users/${auth?.currentUser?.uid}/`
          );
          set(databaseRef, {
            email: auth?.currentUser?.email,
            profile_picture: auth?.currentUser?.photoURL,
            username: changeName,
          });

          // redux store update
          dispatch(
            userLoginInfo({
              ...data,
              displayName: changeName,
            })
          );
          // local storage update
          localStorage.setItem("user", JSON.stringify(auth.currentUser));
          setChangeName("")
        })
          .then(() => {
            // Profile updated!
            toast.success("Profile updated");
          })
          .catch((error) => {
            // An error occurred
            toast.error(error);
          });
      }
    }


    const handleSubmitPass = (e) => {
      e.preventDefault();

      if(changePass == "" || changeConfirmPass == ""){
        toast.warn("Put your Password")
      }else if (changePass != changeConfirmPass) {
        toast.warn("password not match")
      }else{
        const user = auth.currentUser;
        const newPassword = changePass;

        updatePassword(user, newPassword)
          .then(() => {
            // Update successful.
            toast.success("Password changed Successfully")
            setChangePass("");
            setChangeConfirmPass("");
            
              localStorage.removeItem("user");
              dispatch(userLoginInfo(null));
              dispatch(activeChatInfo(null));
              localStorage.removeItem("activeFriend");
              navigate("/");
           
            
          })
          .catch((error) => {
            // An error ocurred
            toast.error(error)
          });
      }

    }



  return (
    <div className="">
      {/* name change here */}
      <div className="">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="text-center mt-4">
            <ChangeProfie />
            {/* proile pic change */}
            <div className="avatar">
              <div className="w-24 rounded-full relative group">
                <img src={data?.photoURL} />
                <div
                  className="uploadIcon h-full w-full hidden group-hover:flex absolute left-0 top-0 justify-center items-center text-3xl text-yellow-500 bg-black bg-opacity-70 cursor-pointer"
                  onClick={() =>
                    document.getElementById("my_modal_11").showModal()
                  }
                >
                  <FaCloudUploadAlt />
                </div>
              </div>
            </div>
            {/* profile pic change */}
          </div>
          <form onSubmit={handleSubmitName} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                value={changeName}
                onChange={handleName}
                placeholder="Type here"
                className="input input-bordered input-success w-full max-w-xs"
              />
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary">Confirm</button>
            </div>
          </form>
          <div className="flex justify-center p-5">
            <label className="label">
              <button
                onClick={() =>
                  document.getElementById("my_modal_50").showModal()
                }
                className="label-text-alt link link-hover text-xl"
              >
                Change Password
              </button>
            </label>
          </div>
        </div>
      </div>
      {/* password change here */}

      <dialog id="my_modal_50" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Change Your Password Carefully!</h3>
          <form onSubmit={handleSubmitPass} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">New Password</span>
              </label>
              <input
                type="password"
                value={changePass}
                onChange={handlePass}
                placeholder="Type here"
                className="input input-bordered input-success w-full max-w-xs"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                value={changeConfirmPass}
                onChange={handleConfirmPass}
                placeholder="Type here"
                className="input input-bordered input-success w-full max-w-xs"
              />
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary">Confirm</button>
            </div>
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
  );
};

export default ProfileUpdate;
