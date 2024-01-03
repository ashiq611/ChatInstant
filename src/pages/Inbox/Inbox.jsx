import InboxChat from "../../components/InboxChat";
import InboxFriendList from "../../components/InboxFriendList";
import InboxGroups from "../../components/InboxGroups";


const Inbox = () => {
    return (
      <div>
        <div className="h-screen w-full lg:flex justify-between flex-wrap">
          <div className="">
            <InboxGroups />
            <InboxFriendList />
          </div>
          <div>
            <InboxChat />
          </div>
        </div>
      </div>
    );
};

export default Inbox;