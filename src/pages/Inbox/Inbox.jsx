
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import InboxChat from "../../components/InboxChat";
import InboxFriendList from "../../components/InboxFriendList";
import InboxGroups from "../../components/InboxGroups";
import MobileNav from "../../components/MobileNav";
import { activeChatInfo } from "../../slices/activeChatSlice";


const Inbox = () => {
  const activeChat = useSelector((state) => state.activeChatInfo.activeInfo);
  const dispatch = useDispatch();

  const isMobile = useMediaQuery({
    query: "(max-width: 900px)",
  });

  console.log(isMobile);

 


  return (
    <div className="min-h-screen w-full bg-gray-100">
      <div>
        <MobileNav />
      </div>
      {isMobile ? (
        <div className="p-4 lg:flex lg:justify-between lg:flex-wrap">
          <div className="w-full">
            {activeChat === null && (
              <div className="h-1/2">
                <InboxGroups />
              </div>
            )}
            {activeChat === null && (
              <div className="h-1/2">
                <InboxFriendList />
              </div>
            )}
            {activeChat !== null && (
              <div>
                
                <InboxChat />{" "}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className=" p-4 lg:flex  lg:justify-between lg:flex-wrap">
          <div className="w-full lg:w-1/4">
            <div className="h-1/2">
              <InboxGroups />
            </div>
            <div className="h-1/2">
              <InboxFriendList />
            </div>
          </div>
          <div className="w-full lg:w-3/4 p-5 lg:pb-20 mt-4 lg:mt-0 border border-2 ">
            <InboxChat />
          </div>
        </div>
      )}
    </div>
  );
};

export default Inbox;
