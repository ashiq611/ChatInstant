import Homes from "../../components/Homes";
import { ImCross } from "react-icons/im";
import homeLogoAni from "../../assets/lottie/homeLogoAni.json";
import inboxLogoAni from "../../assets/lottie/inboxLogoAni.json";
import notiLogoAni from "../../assets/lottie/notiLogoAni.json";
import settingsLogoAni from "../../assets/lottie/settingsLogoAni.json";
import logoutLogoAni from "../../assets/lottie/logoutLogoAni.json";
import Lottie from "lottie-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { userLoginInfo } from "../../slices/userSlice";
import { toast } from "react-toastify";
import { FaCloudUploadAlt } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.userLoginInfo.userInfo);

  // private page
  useEffect(() => {
    if (!data) {
      navigate("/");
    }
  });

  const logOutHandle = () => {
    localStorage.removeItem("user");
    dispatch(userLoginInfo(null));
    navigate("/");
    toast.warn("Logged out Successfully");
  };
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="h-screen w-full  drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <Homes />
          {/* profile upload modal */}
          <div>
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Upload Your Profile Picture</h3>
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

            <ul className="menu p-4 pt-10 w-40">
              <li>
                <div className="avatar online">
                  <div className="w-24 rounded-full relative group">
                    <img src={data?.photoURL} />
                    <div
                      className="uploadIcon h-full w-full hidden group-hover:flex absolute left-0 top-0 justify-center items-center text-3xl text-yellow-500 bg-black bg-opacity-70 cursor-pointer"
                      onClick={() =>
                        document.getElementById("my_modal_1").showModal()
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
              <li>
                <a>
                  <Lottie animationData={homeLogoAni} />
                </a>
              </li>
              <li>
                <a>
                  {" "}
                  <Lottie animationData={inboxLogoAni} />
                </a>
              </li>
              <li>
                <a>
                  <Lottie animationData={notiLogoAni} />
                </a>
              </li>
              <li>
                <a>
                  <Lottie animationData={settingsLogoAni} />
                </a>
              </li>
            </ul>
            <ul className="menu p-4 w-30">
              <li>
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

export default Home;
