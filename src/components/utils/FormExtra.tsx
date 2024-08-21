import { Link } from "react-router-dom";

interface FormExtraProps {
  Data2?: string;
  Data2Link: string;
}

export default function FormExtra({ Data2, Data2Link }: FormExtraProps) {
  return (
    <div className="flex xl:justify-center justify-evenly h-10  xl:flex-row items-center ">
      <div className="text-sm">
        <Link
          to={Data2Link}
          className="font-medium text-purple-600 hover:text-purple-500"
        >
          {Data2}
        </Link>
      </div>
    </div>
  );
}
