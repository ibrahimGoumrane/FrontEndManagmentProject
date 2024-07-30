import { Link } from "react-router-dom";

interface PoliciesProps {
  name: string;
  linkName?: string;
  linkUrl: string; // Provide a default value or make it required
  paragraph?: string;
}

const Policies = ({ name, linkName, linkUrl, paragraph }: PoliciesProps) => {
  return (
    <div className="flex items-center justify-center flex-col pt-4">
      <a
        href="#"
        className=" text-purple-600 hover:text-purple-500 text-sm font-light font-mono "
      >
        Check Our Policies {name}
      </a>
      <p className=" text-center text-sm text-gray-600 ">
        {paragraph}{" "}
        <Link
          to={linkUrl}
          className=" text-purple-600 hover:text-purple-500 font-extrabold "
        >
          {linkName}
        </Link>
      </p>
    </div>
  );
};

export default Policies;
