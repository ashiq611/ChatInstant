import { FaCloudUploadAlt } from "react-icons/fa";
import ChangeProfie from "./ChangeProfie";
import { useSelector } from "react-redux";
import { useState } from "react";

const ProfileUpdate = () => {
  const data = useSelector((state) => state.userLoginInfo.userInfo);


  const [changeName, setChangeName] = useState("")
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
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered"
                value={changeName}
                required
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
