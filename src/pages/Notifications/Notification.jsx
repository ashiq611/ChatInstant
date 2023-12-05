import { MdOutlineMenuOpen } from "react-icons/md";

const Notification = () => {
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
