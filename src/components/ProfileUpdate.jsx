import { FaCloudUploadAlt } from "react-icons/fa";
import ChangeProfie from "./ChangeProfie";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { getDatabase, ref , set } from "firebase/database";
import { toast } from "react-toastify";
import { userLoginInfo } from "../slices/userSlice";


const ProfileUpdate = () => {
  const auth = getAuth();
    const database = getDatabase();

    const dispatch = useDispatch()

  const data = useSelector((state) => state.userLoginInfo.userInfo);


  const [changeName, setChangeName] = useState("")


    const handleName = (e) => {
      setChangeName(e.target.value);
    };


    const handleSubmit = (e)=> {
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



  return (
    <div className="">
      {/* name change here */}
      <div className="">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="text-center mt-4">
            <ChangeProfie />
            {/* proile pic change */}
            <div className="avatar online">
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
          <form onSubmit={handleSubmit} className="card-body">
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
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Change Password
                </a>
              </label>
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary">Confirm</button>
            </div>
          </form>
        </div>
      </div>
      {/* password change here */}
    </div>
  );
};

export default ProfileUpdate;
