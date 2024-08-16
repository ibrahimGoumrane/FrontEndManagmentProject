import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface headingProps {
  heading: string;
  Img?: ReactNode;
  extra?: string;
}
export default function Header({ heading, Img, extra }: headingProps) {
  return (
    <div className="">
      <div className="flex justify-center">
        <Link to="/">{Img}</Link>
      </div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {heading}
      </h2>
      <div className="flex justify-center font-extrabold text-purple-600 mt-3 text-nowrap">
        {extra}
      </div>
    </div>
  );
}
