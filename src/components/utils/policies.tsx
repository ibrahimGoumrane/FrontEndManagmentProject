import { Link } from "react-router-dom";

interface PoliciesProps {
  linkName?: string;
  linkUrl: string; // Provide a default value or make it required
  paragraph?: string;
}

const Policies = ({ linkName, linkUrl, paragraph }: PoliciesProps) => {
  return (
    <div className="flex items-center justify-end pt-4">
      <p className=" text-right text-sm text-gray-600 ">
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
