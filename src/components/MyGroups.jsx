import { HiDotsVertical } from "react-icons/hi";

const MyGroups = () => {
  return (
    <div className="relative">
      <div className="sticky top-0 p-2 flex justify-between bg-base-100 z-10">
        <h1 className="head font-bold text-xl font-mono">My Groups</h1>
        <div className="text-2xl font-bold text-cyan-600 cursor-pointer">
          <HiDotsVertical />
        </div>
      </div>
      <div className="divide-y divide-blue-900 ">
        <div className="flex justify-between px-5 py-2">
          <div className="left flex gap-5">
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img src="https://img.freepik.com/free-photo/worldface-side-view-african-man_53876-23488.jpg" />
              </div>
            </div>
            <div className="msg">
              <div className="name font-bold text-base md:text-lg font-custom">
                <h1>Ashiq</h1>
              </div>
              <div className="inbox text-sm md:text-base">
                <p>hello..</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyGroups;
