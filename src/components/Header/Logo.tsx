import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={"/"} className="flex items-center">
      <img
        src="https://demo.themesberg.com/landwind/images/logo.svg"
        className="h-6 mr-3 sm:h-9"
        alt="Landwind Logo"
      />
      <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
        Manager.IO
      </span>
    </Link>
  );
};

export default Logo;
