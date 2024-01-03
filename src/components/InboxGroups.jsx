import { HiDotsVertical } from "react-icons/hi";


const InboxGroups = () => {
    return (
      <div>
        <div className="relative">
          <div className="sticky top-0 p-2 flex justify-between bg-base-100 z-10 ">
            <h1 className="head font-bold text-xl font-mono">Groups</h1>
            <div className="text-2xl font-bold text-cyan-600 cursor-pointer">
              <HiDotsVertical />
            </div>
          </div>
          <div className="divide-y divide-blue-900 ">
            {/* single */}

            <div className="flex justify-between px-5 py-2">
              <div className="left flex gap-5">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                  </div>
                </div>
                <div className="msg">
                  <div className="name font-bold text-base md:text-lg font-custom">
                    <h2>Group name</h2>
                  </div>
                  <div className="inbox text-sm md:text-base">
                    <p>hello..</p>
                  </div>
                </div>
              </div>
              <div className="right flex items-center gap-2 flex-wrap">
                {/* <button
                  onClick={() => handleBlock(f)}
                  className="btn btn-warning btn-xs lg:btn-sm "
                >
                  Block
                </button>
                <button
                  onClick={() => handleUnfriend(f)}
                  className="btn btn-error btn-xs lg:btn-sm "
                >
                  Unfriend
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default InboxGroups;