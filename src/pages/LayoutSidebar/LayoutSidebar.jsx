// react cropper import
import { useState, useRef } from "react";
// import Cropper from "react-cropper";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";

// own import

import { ImCross } from "react-icons/im";
import homeLogoAni from "../../assets/lottie/homeLogoAni.json";
import inboxLogoAni from "../../assets/lottie/inboxLogoAni.json";
import newsfeedLogoAni from "../../assets/lottie/newsfeedLogoAni.json";
// import notiLogoAni from "../../assets/lottie/notiLogoAni.json";
import settingsLogoAni from "../../assets/lottie/settingsLogoAni.json";
import logoutLogoAni from "../../assets/lottie/logoutLogoAni.json";
import Lottie from "lottie-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { userLoginInfo } from "../../slices/userSlice";
import { toast } from "react-toastify";
import { FaCloudUploadAlt } from "react-icons/fa";

import { activeChatInfo } from "../../slices/activeChatSlice";
import ChangeProfie from "../../components/ChangeProfie";


const LayoutSidebar = ({ children }) => {

 

  // file upload in firebase ends
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.userLoginInfo.userInfo);






 

  // private page
  useEffect(() => {
    if (!data) {
      navigate("/");
    }
  });

  // console.log(image);


  const logOutHandle = () => {
    localStorage.removeItem("user");
    dispatch(userLoginInfo(null));
   dispatch(
     activeChatInfo(null)
   );
   localStorage.removeItem(
     "activeFriend",
    
   );
    navigate("/");
    toast.warn("Logged out Successfully");
  };
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        <div className="h-screen w-full  drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}

          {children}

          {/* Page content here */}
          {/* profile upload modal */}
          <ChangeProfie />
        </div>
        <div className="drawer-side z-30">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="relative w-40 min-h-full bg-gradient-to-r from-[#8d99ae] [#edf2f4] to-[#ffffff] text-base-content flex flex-col justify-between">
            <label
              htmlFor="my-drawer-2"
              className="absolute top-0.5 right-0.5 btn drawer-button lg:hidden"
            >
              <ImCross />
            </label>

            <ul className="menu p-4 pt-10 w-40 font-bold">
              <li className="tooltip" data-tip="Change Profile Photo">
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
                <div className="flex justify-center">
                  <h2 className="font-bold capitalize">{data?.displayName}</h2>
                </div>
              </li>
            </ul>
            <ul className="menu p-4 w-30 flex flex-col items-center gap-8 font-bold">
              <li className="tooltip" data-tip="Home">
                <Link to="/home">
                  <Lottie animationData={homeLogoAni} />
                </Link>
              </li>
              <li className="tooltip" data-tip="Inbox">
                <Link to="/inbox">
                  {" "}
                  <Lottie animationData={inboxLogoAni} />
                </Link>
              </li>
              <li className="tooltip" data-tip="Newsfeed">
                <Link to="/newsfeed">
                  <Lottie animationData={newsfeedLogoAni} />
                </Link>
              </li>
              <li className="tooltip" data-tip="Settings">
                <Link to="/settings">
                  <Lottie animationData={settingsLogoAni} />
                </Link>
              </li>
            </ul>
            <ul className="menu p-4 w-30 font-bold">
              <li className="tooltip" data-tip="Logout">
                <button onClick={logOutHandle}>
                  <Lottie animationData={logoutLogoAni} />
                </button>
              </li>
            </ul>
          </div>
          {/* <ul className="menu p-4 w-40 min-h-full bg-base-200 text-base-content">
             
              <li>
                <div className="avatar online">
                  <div className="w-24 rounded-full">
                    <img src="https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg" />
                  </div>
                </div>
              </li>
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>Inbox</a>
              </li>
              <li>
                <a>Notifications</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>  */}
        </div>
      </div>
    </div>
  );
};

export default LayoutSidebar;




