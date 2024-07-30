import { Link } from "react-router-dom";

export interface NavItemProps {
  name: string;
  href: string;
  active: boolean;
  index: number;
  className?: string;
  handleClick: (event: React.MouseEvent<HTMLAnchorElement>) => void; // Corrected spelling and added type
}
const defaultStyling =
  "block py-2 pl-3 pr-4 text-white bg-purple-700 rounded lg:bg-transparent lg:text-purple-700 hover:text-purple-500 lg:p-0 duration-200 hover:underline-offset-2 hover:underline   dark:text-white";
const activeStyling = "bg-purple-600 p-2 rounded-xl text-white";

const NavItem = ({
  name,
  href,
  active,
  handleClick,
  index,
  className = defaultStyling,
}: NavItemProps) => {
  return (
    <li>
      <Link
        onClick={handleClick}
        to={href}
        id={`${index}`}
        className={
          "hover:text-black  duration-300 translate-y-0 hover:-translate-y-0.5 " +
          `${active ? activeStyling : className} `
        }
      >
        {name}
      </Link>
    </li>
  );
};

export default NavItem;
