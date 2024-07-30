import { useState } from "react";
import { Project } from "../../models/Projects";
import { TiArrowSortedDown } from "react-icons/ti";
import DropDownItems from "./DropDownItems";
import "./dropDown.css";
interface DropDownNavProps {
  projects: Project[] | null;
}

function DropdownNav({ projects }: DropDownNavProps) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const handleClick = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };
  return (
    <div className=" text-white">
      <h2 className="flex w-full items-center justify-start  mb-1 pl-3 pr-3">
        <button
          onClick={handleClick}
          className={
            "mr-2" + `${isDropDownOpen ? " -rotate-90 duration-150" : ""}`
          }
        >
          <TiArrowSortedDown />
        </button>
        <span className="capitalize font-semibold">Recent Projects</span>
      </h2>
      <hr className="pb-1 rounded-full   bg-white" />
      <ul
        className={
          "pl-5  pr-5 pt-2 listInit " +
          `${isDropDownOpen ? "" : " listClickes"}`
        }
      >
        {projects?.length !== 0 ? (
          projects?.map((project, index) => (
            <DropDownItems
              key={index}
              name={project?.name || "Unnamed Project"}
              status={"started"}
            />
          ))
        ) : (
          <li className=" font-extrabold">No projects yet</li>
        )}
      </ul>
    </div>
  );
}
export default DropdownNav;
