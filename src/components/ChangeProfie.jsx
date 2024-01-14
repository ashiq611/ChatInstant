import { getAuth, updateProfile } from 'firebase/auth';
 //  update profile in realtime db
import { getDatabase, ref as dbRef, set } from "firebase/database";
// file upload in firebase
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";

import  { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginInfo } from '../slices/userSlice';
import { toast } from 'react-toastify';
import { Cropper } from 'react-cropper';

const ChangeProfie = () => {
      const auth = getAuth();
  // file uplaod in firebase starts
  const storage = getStorage();
  //  update profile in realtime db
  const database = getDatabase();

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

  return (
    <div>
      <dialog id="my_modal_11" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Upload Your Profile Picture</h3>
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
  );
};

export default ChangeProfie;