import { Link } from "react-router-dom";

interface FormExtraProps {
  Data1?: string;
  Data2?: string;
  Data2Link: string;
  setIsChecked?: () => void;
}

export default function FormExtra({
  Data1,
  Data2,
  Data2Link,
  setIsChecked,
}: FormExtraProps) {
  return (
    <div className="flex  xl:justify-between  justify-evenly h-20  xl:flex-row items-center  ">
      <div className="flex justify-between xl:justify-center xl:items-center ">
        <input
          id={Data1}
          name={Data1}
          type="checkbox"
          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          onClick={setIsChecked}
        />
        <label htmlFor={Data1} className="ml-2 block text-sm text-gray-900">
          {Data1}
        </label>
      </div>

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
