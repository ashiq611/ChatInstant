import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { MdOutlineMenuOpen } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Notification = () => {
   const db = getDatabase();
  const [note, setNote] = useState([]);
    const navigate = useNavigate();
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  // private page
  useEffect(() => {
    if (!data) {
      navigate("/");
    }
  });


 useEffect(()=> {
   // user notification
   // Record the notification Date
   
   const deviceRef = ref(db, "notifications");
   onValue(deviceRef, (snapshot) => {
     let note = [];
     snapshot.forEach((req) => {
       if (req.val().userID === data?.uid) {
         note.push({ ...req.val(), id: req.key });
       }
     });
     
     setNote(note);
   });
   // user notifications


   
 },[db, data?.uid])
//  console.log(note);

  return (
    <div className="lg:w-2/3 w-full h-screen overflow-y-scroll">
      <div>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary btn-sm drawer-button text-2xl lg:hidden"
        >
          <MdOutlineMenuOpen />
        </label>
      </div>
      <div className="sticky top-0 p-2 flex justify-between bg-base-100 z-10">
        <h1 className="head font-bold text-xl font-mono">Notification</h1>
      </div>
      {note?.map((n) => (
        <>
          <div key={n.id} role="alert" className="alert shadow-lg mt-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-info shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <div>
              <h3 className="font-bold">New message!</h3>
              <div className="text-xs">{n.note}</div>
              <div className="text-xs">
                {n.loggedInDate && new Date(n.loggedInDate).toLocaleString()}
              </div>
            </div>
            <button className="btn btn-sm">See</button>
          </div>
          
        </>
      ))}
    </div>
  );
};

export default Notification;
