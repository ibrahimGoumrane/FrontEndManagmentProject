import { Toast } from "flowbite-react";

interface componentProps {
  date: Date;
}
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export default function Component({ date }: componentProps) {
  const formattedDate =
    date.getFullYear() !== new Date().getFullYear()
      ? `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
      : `${date.getDate()} ${months[date.getMonth()]}`;

  return (
    <Toast className="  flex items-center justify-center bg-slate-200 border-none shadow-none p-0">
      <div className="text-sm font-normal italic  text-white rounded-lg bg-indigo-500 px-5 py-2 flex items-center justify-center">
        {formattedDate}
      </div>
    </Toast>
  );
}
