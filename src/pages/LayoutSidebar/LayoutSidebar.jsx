// react cropper import
import { useState, useRef } from "react";
// import Cropper from "react-cropper";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";

// own import

import { ImCross } from "react-icons/im";
import homeLogoAni from "../../assets/lottie/homeLogoAni.json";
import inboxLogoAni from "../../assets/lottie/inboxLogoAni.json";
import notiLogoAni from "../../assets/lottie/notiLogoAni.json";
import settingsLogoAni from "../../assets/lottie/settingsLogoAni.json";
import logoutLogoAni from "../../assets/lottie/logoutLogoAni.json";
import Lottie from "lottie-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { userLoginInfo } from "../../slices/userSlice";
import { toast } from "react-toastify";
import { FaCloudUploadAlt } from "react-icons/fa";
// file upload in firebase
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
 //  update profile in realtime db
import { getDatabase, ref as dbRef, set } from "firebase/database";
import HomeNav from "../../components/HomeNav";


const LayoutSidebar = ({ children }) => {
  const auth = getAuth();
  // file uplaod in firebase starts
  const storage = getStorage();
  //  update profile in realtime db
  const database = getDatabase();
 

  // file upload in firebase ends
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.userLoginInfo.userInfo);

  // react cropper starts
  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("#");
  const cropperRef = useRef();

  const handleProfileUplaod = (e) => {
    e.preventDefault();

    let files;

    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };
  const uploadCancel = () => {
    setImage("");
    setCropData("");
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());

      //  firebase file upload

      const storageRef = ref(storage, auth?.currentUser?.uid);

      //or or or from redux store use
      //  const storageRef = ref(storage, data?.uid);

      // Data URL string
      const message4 = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        //  console.log("Uploaded a data_url string!");

        getDownloadURL(storageRef).then((downloadURL) => {
          // console.log("File available at", downloadURL);
          updateProfile(auth?.currentUser, {
            photoURL: downloadURL,
          });

          //  update profile in realtime db
          const databaseRef = dbRef(
            database,
            `/users/${auth?.currentUser?.uid}/`
          );
          set(databaseRef, {
            email: auth?.currentUser?.email,
            profile_picture: downloadURL,
            username: auth?.currentUser?.displayName,
          });
        

          // redux store update
          dispatch(
            userLoginInfo({
              ...data,
              photoURL: downloadURL,
            })
          );
          // local storage update
          localStorage.setItem("user", JSON.stringify(auth.currentUser));
          toast.success("Your Profile Picture is uploaded Successfully");
        });

        // clear modal
        setImage("");
        setCropData("");

        //  update profile in realtime db
        // const databaseRef = dbRef(
        //   database,
        //   `/users/${auth?.currentUser?.uid}/`
        // );
        // set(databaseRef, {
        //   email: auth?.currentUser?.email,
        //   profile_picture: auth?.currentUser?.photoURL,
        //   username: auth?.currentUser?.displayName,
        // });
      });
    }
  };

  // react cropper ends

 

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
          <HomeNav/>
          {/* Page content here */}
          {/* profile upload modal */}
          <div>
            <dialog id="my_modal_11" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">
                  Upload Your Profile Picture
                </h3>
                <div className="m-4">
                  <input
                    type="file"
                    className="file-input file-input-bordered file-input-warning w-full max-w-xs"
                    onChange={handleProfileUplaod}
                  />
                </div>
                <div>
                  {!image && image == "<empty string>" ? (
                    <div>
                      <img
                        src={data?.photoURL}
                        alt={data?.displayName}
                        className="w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden mx-auto my-5"
                      />
                    </div>
                  ) : (
                    <div className="img-preview w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden  mx-auto my-5" />
                  )}
                </div>
                {image && (
                  <Cropper
                    style={{ height: 400, width: "100%" }}
                    initialAspectRatio={1}
                    preview=".img-preview"
                    src={image}
                    ref={cropperRef}
                    viewMode={1}
                    guides={true}
                    minCropBoxHeight={10}
                    minCropBoxWidth={10}
                    background={false}
                    responsive={true}
                    checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                  />
                )}
                <div className="modal-action">
                  {image && (
                    <button onClick={getCropData} className="btn btn-warning">
                      Upload
                    </button>
                  )}
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button onClick={uploadCancel} className="btn btn-error">
                      Close
                    </button>
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
              <li>
                <Link to="/home">
                  <Lottie animationData={homeLogoAni} />
                </Link>
              </li>
              <li>
                <Link to="/inbox">
                  {" "}
                  <Lottie animationData={inboxLogoAni} />
                </Link>
              </li>
              <li>
                <Link to="/notifications">
                  <Lottie animationData={notiLogoAni} />
                </Link>
              </li>
              <li>
                <Link to='/settings'>
                  <Lottie animationData={settingsLogoAni} />
                </Link>
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

export default LayoutSidebar;
