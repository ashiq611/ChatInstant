import { useEffect } from "react";
import { MdOutlineMenuOpen } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Notification = () => {
    const navigate = useNavigate();
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  // private page
  useEffect(() => {
    if (!data) {
      navigate("/");
    }
  });
  return (
    <div>
      <div>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary btn-sm drawer-button text-2xl lg:hidden"
        >
          <MdOutlineMenuOpen />
        </label>
      </div>
      <h1>notification</h1>
    </div>
  );
};

export default Notification;
