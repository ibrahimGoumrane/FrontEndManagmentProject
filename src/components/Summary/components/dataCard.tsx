import { ReactNode } from "react";

interface DataCardProps {
  icons: ReactNode;
  title: string;
  number: number;
  date?: string;
}

export default function DataCard({
  icons,
  title,
  number,
  date = "last",
}: DataCardProps) {
  return (
    <div className="max-h-[96px] p-10 bg-gray-100 rounded-md flex items-center gap-5 justify-start ">
      <span className=" bg-white text-slate-900 text-2xl font-extrabold p-5 rounded-full ">
        {icons}
      </span>
      <div className="flex flex-col justify-start items-start">
        <div className="text-slate-900 text-xl flex items-center justify-start gap-2 font-medium">
          <span>{number}</span>
          <span>{title}</span>
        </div>
        <div className="text-slate-500 text-sm font-semibold">
          in the {date} 7 days
        </div>
      </div>
    </div>
  );
}
