import avatar from "../../assets/Avatar.png";
import bell from "../../assets/bell.png";
import settings from "../../assets/settings.png";
import {HiOutlineMenuAlt1} from "react-icons/hi"
export default function Nav() {
  return (
    <nav className="px-4 md:px-20 py-4 flex justify-between border-b items-center border-b-gray-200">
      <span className="text-2xl font-inter font-bold">ToDo</span>
      <HiOutlineMenuAlt1 className="block lg:hidden text-xl"/>
      <div className=" items-center lg:flex hidden ">
        <div className="p-[10px] mr-1 cursor-pointer">
          <img className="w-5 h-5" src={settings} alt="settings" />
        </div>
        <div className="p-[10px] mr-4 cursor-pointer">
          <img className="w-5 h-5" src={bell} alt="bell" />
        </div>
        <img className="w-10" src={avatar} alt="avatar" />
      </div>
    </nav>
  );
}
