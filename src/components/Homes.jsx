import { MdOutlineMenuOpen } from "react-icons/md";
import UserList from "./UserList";
import GroupList from "./GroupList";
import Friends from "./Friends";
import FriendRequest from "./FriendRequest";
import MyGroups from "./MyGroups";
import BlockedUsers from "./BlockedUsers";

const Homes = () => {
  return (
    <div>
      <div className="h-screen w-full lg:flex justify-between flex-wrap">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary btn-sm drawer-button text-2xl lg:hidden sticky top-0 left-0 z-30"
        >
          <MdOutlineMenuOpen />
        </label>
        <div className="w-full mt-2 lg:w-[33%] h-1/2 shadow-lg shadow-base-300 list overflow-y-scroll">
          <GroupList />
        </div>
        <div className="w-full mt-2 lg:w-[33%] h-1/2 shadow-lg shadow-base-300 list overflow-y-scroll">
          <Friends />
        </div>
        <div className="w-full mt-2 lg:w-[33%] h-1/2 shadow-lg shadow-base-300 list overflow-y-scroll">
          <UserList />
        </div>
        <div className="w-full mt-2 lg:w-[33%] h-1/2 shadow-lg shadow-base-300 list overflow-y-scroll">
          <FriendRequest />
        </div>
        <div className="w-full mt-2 lg:w-[33%] h-1/2 shadow-lg shadow-base-300 list overflow-y-scroll">
          <MyGroups />
        </div>
        <div className="w-full mt-2 lg:w-[33%] h-1/2 shadow-lg shadow-base-300 list overflow-y-scroll">
          <BlockedUsers />
        </div>
      </div>
    </div>
  );
};

export default Homes;
