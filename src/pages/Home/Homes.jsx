import { MdOutlineMenuOpen } from "react-icons/md";
import UserList from "../../components/UserList";
import GroupList from "../../components/GroupList";
import Friends from "../../components/Friends";
import FriendRequest from "../../components/FriendRequest";
import MyGroups from "../../components/MyGroups";
import BlockedUsers from "../../components/BlockedUsers";
import HomeNav from "../../components/HomeNav";


const Homes = () => {
  return (
    
      <div>
        {/* <HomeNav/> */}
        <div className="h-screen w-full lg:flex justify-between flex-wrap">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary btn-sm drawer-button text-2xl lg:hidden"
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
