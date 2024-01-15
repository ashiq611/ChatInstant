
import UserList from "../../components/UserList";
import GroupList from "../../components/GroupList";
import Friends from "../../components/Friends";
import FriendRequest from "../../components/FriendRequest";
import MyGroups from "../../components/MyGroups";
import BlockedUsers from "../../components/BlockedUsers";

import MobileNav from "../../components/MobileNav";


const Homes = () => {
  return (
    <div>

      <div className="h-screen w-full lg:flex justify-between flex-wrap">
   
          <MobileNav/>
      
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
