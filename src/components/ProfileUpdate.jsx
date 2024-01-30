import { FaCloudUploadAlt } from "react-icons/fa";
import ChangeProfie from "./ChangeProfie";
import { useSelector } from "react-redux";


const ProfileUpdate = () => {
     const data = useSelector((state) => state.userLoginInfo.userInfo);
    return (
      <div>
        <ChangeProfie />
{/* proile pic change */}
        <div className="avatar online">
          <div className="w-24 rounded-full relative group">
            <img src={data?.photoURL} />
            <div
              className="uploadIcon h-full w-full hidden group-hover:flex absolute left-0 top-0 justify-center items-center text-3xl text-yellow-500 bg-black bg-opacity-70 cursor-pointer"
              onClick={() => document.getElementById("my_modal_11").showModal()}
            >
              <FaCloudUploadAlt />
            </div>
          </div>
        </div>
        {/* profile pic change */}

        {/* name change here */}

        {/* password change here */}
      </div>
    );
};

export default ProfileUpdate;