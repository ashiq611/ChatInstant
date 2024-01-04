import { MdOutlineMenuOpen } from "react-icons/md";
import InboxChat from "../../components/InboxChat";
import InboxFriendList from "../../components/InboxFriendList";
import InboxGroups from "../../components/InboxGroups";

const Inbox = () => {
  return (
    <div className="min-h-screen w-full bg-gray-100">
      <div>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary btn-sm drawer-button text-2xl lg:hidden"
        >
          <MdOutlineMenuOpen />
        </label>
      </div>
      <div className=" p-4 lg:flex  lg:justify-between lg:flex-wrap">
        <div className="w-full lg:w-1/4">
          <div className="h-1/2">
            <InboxGroups />
          </div>
          <div className="h-1/2">
            <InboxFriendList />
          </div>
        </div>
        <div className="w-full lg:w-3/4 mt-4 lg:mt-0 border border-2 border-red-500">
          <InboxChat />
        </div>
      </div>
    </div>
  );
};

export default Inbox;
