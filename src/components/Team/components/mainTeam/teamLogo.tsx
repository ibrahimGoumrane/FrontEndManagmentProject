import { NavigateFunction } from "react-router-dom";

const colors = [
  "bg-indigo-200",
  "bg-orange-200",
  "bg-pink-200",
  "bg-gray-200",
  "bg-purple-200",
];
const stylesActive =
  "flex flex-row items-center  bg-purple-500 text-white rounded-xl p-2";
const basicStyles =
  "flex flex-row items-center hover:bg-gray-100 rounded-xl p-2";
const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};
export default function TeamLogo({
  id,
  name,
  active,
  navigate,
}: {
  id: string;
  name: string;
  active: boolean;
  navigate: NavigateFunction;
}) {
  return (
    <button
      className={`${active ? stylesActive : basicStyles}`}
      onClick={() => navigate("/home/teams/" + id)}
    >
      <div
        className={
          "flex items-center justify-center h-8 w-8  rounded-full " +
          getRandomColor()
        }
      >
        {name[0].toUpperCase()}
      </div>
      <div className="ml-2 text-sm font-semibold">
        {name[0].toUpperCase() + name.split("").slice(1).join("")}
      </div>
    </button>
  );
}
