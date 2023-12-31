
import { Link, useLocation } from "react-router-dom";
import { TbBrandMessenger } from "react-icons/tb";
import { BsPostcardHeart } from "react-icons/bs";
import { GrNotification } from "react-icons/gr";

const HomeNav = () => {
    const location = useLocation();
  return (
    <div>
      <div className="btm-nav z-20">
        <Link
          to="/home"
          className={`button ${
            location.pathname === "/home" ? "active" : ""
          } bg-pink-200 text-pink-600`}
        >
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg> */}
          <div className="text-xl font-bold">
            <TbBrandMessenger />
          </div>
          <span className="btm-nav-label">Messenger</span>
        </Link>
        <Link
          to="/newsfeed"
          className={`button ${
            location.pathname === "/newsfeed" ? "active" : ""
          } bg-blue-200 text-blue-600 border-blue-600`}
        >
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg> */}
          <div className="text-xl font-bold">
            <BsPostcardHeart />
          </div>
          <span className="btm-nav-label">Newsfeed</span>
        </Link>
        <Link
          to="/notifications"
          className={`button ${
            location.pathname === "/notifications" ? "active" : ""
          }bg-teal-200 text-teal-600 `}
        >
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg> */}
          <div className="text-xl font-bold">
            <GrNotification />
          </div>
          <span className="btm-nav-label">Notification</span>
        </Link>
      </div>
    </div>
  );
};

export default HomeNav;
