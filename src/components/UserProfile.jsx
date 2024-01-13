import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const UserProfile = () => {
  const data = useSelector((state) => state.userLoginInfo.userInfo);
    return (
      <div className="flex flex-col gap-5 items-center">
        <div>
          <ul className="menu bg-base-200 lg:menu-horizontal rounded-box">
            <li>
              <Link to="/inbox">
                <svg
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
                </svg>
                Inbox
                <span className="badge badge-sm">99+</span>
              </Link>
            </li>
            <li>
              <Link to="/notifications">
                <svg
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
                </svg>
                Notification
                <span className="badge badge-sm badge-warning">2+</span>
              </Link>
            </li>
            <li>
              <a>
                Online
                <span className="badge badge-xs badge-success"></span>
              </a>
            </li>
          </ul>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure className="px-10 p-2">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={data.photoURL} />
              </div>
            </div>
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{data.displayName}</h2>
            <p>{data.email}</p>
            <div className="card-actions">
              <button className="btn btn-primary">Change</button>
            </div>
          </div>
        </div>

        <div>
          <div className="stats stats-vertical shadow">
            <div className="stat">
              <div className="stat-title">Friends</div>
              <div className="stat-value">10 persons</div>
              <div className="stat-desc">Jan 1st - Feb 1st</div>
            </div>

            <div className="stat">
              <div className="stat-title">Group</div>
              <div className="stat-value">5</div>
              <div className="stat-desc">↗︎ 400 (22%)</div>
            </div>

            <div className="stat">
              <div className="stat-title">Location</div>
              <div className="stat-value">Dhaka</div>
              <div className="stat-desc">↘︎ 90 (14%)</div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default UserProfile;