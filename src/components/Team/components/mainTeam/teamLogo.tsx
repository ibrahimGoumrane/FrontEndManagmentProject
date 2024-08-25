import { NavigateFunction } from "react-router-dom";

const stylesActive =
  "flex flex-row items-center  bg-purple-500 text-white rounded-xl p-2";
const basicStyles =
  "flex flex-row items-center hover:bg-gray-100 rounded-xl p-2";
export default function TeamLogo({
  id,
  name,
  active,
  navigate,
  teamImg,
}: {
  id: string;
  name: string;
  active: boolean;
  navigate: NavigateFunction;
  teamImg?: string;
}) {
  return (
    <button
      className={`${active ? stylesActive : basicStyles}`}
      onClick={() => navigate("/home/teams/" + id)}
    >
      <img
        src={teamImg}
        alt="teamImg"
        className=" h-8 w-8  rounded-full  overflow-hidden"
      />
      <div className="ml-2 text-sm font-semibold">
        {name[0].toUpperCase() + name.split("").slice(1).join("")}
      </div>
    </button>
  );
}
