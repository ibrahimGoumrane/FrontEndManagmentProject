import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { SiGithub } from "react-icons/si";

const NavSec = () => {
  return (
    <div className="flex justify-center space-x-6">
      <a href="#" className="text-gray-400 hover:text-gray-500">
        <span className="p-3 hover:bg-white hover:text-purple-500 rounded-full inline-flex items-center justify-center bg-purple-800 text-white">
          <FaFacebookF className="w-5 h-5" />
        </span>
      </a>

      <a href="#" className="text-gray-400 hover:text-gray-500">
        <span className="p-3 hover:bg-white hover:text-purple-500 rounded-full inline-flex items-center justify-center bg-purple-800 text-white">
          <FaInstagram className="w-5 h-5" />
        </span>
      </a>

      <a href="#" className="text-gray-400 hover:text-gray-500">
        <span className="p-3 hover:bg-white hover:text-purple-500 rounded-full inline-flex items-center justify-center bg-purple-800 text-white">
          <BsTwitterX className="w-5 h-5" />
        </span>
      </a>

      <a href="#" className="text-gray-400 hover:text-gray-500">
        <span className="p-3 hover:bg-white hover:text-purple-500 rounded-full inline-flex items-center justify-center bg-purple-800 text-white">
          <SiGithub className="w-5 h-5" />
        </span>
      </a>
    </div>
  );
};

export default NavSec;
