import { Link } from "react-router-dom";

interface NavItemProps {
  title: string;
  to: string;
  status?: string;
  active?: boolean;
}

function NavItem({ title, to, status, active = false }: NavItemProps) {
  return (
    <Link
      to={to}
      className={
        "flex justify-start items-center w-full space-x-6   rounded px-3 py-2  mb-3 " +
        `${
          active
            ? "bg-slate-900 text-white"
            : "hover:text-black focus:bg-slate-900  hover:bg-slate-200"
        }`
      }
    >
      <button className="w-full flex items-center justify-between px-2">
        <p className="font-bold capitalize ">{title}</p>
        <p className="text-sm text-purple-400 capitalize font-semibold">
          {status ? status : "just Created"}
        </p>
      </button>
    </Link>
  );
}
export default NavItem;
