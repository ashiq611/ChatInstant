import { MdOutlineMenuOpen } from "react-icons/md";
import logo from "../assets/logo-removebg-preview.png";

const MobileNav = () => {
    return (
      <div className="lg:hidden bg-slate-100 flex justify-between mt-2 p-2 border-b-4 sticky top-0 z-20 ">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-sm drawer-button text-2xl lg:hidden"
        >
          <MdOutlineMenuOpen />
        </label>
        <img className="lg:hidden w-14" src={logo} alt="logo" />
      </div>
    );
};

export default MobileNav;