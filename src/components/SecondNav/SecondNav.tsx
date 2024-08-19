import { useState } from "react";
import { IoIosArrowDropright, IoMdArrowDropdown } from "react-icons/io";
import "./SecondNav.css";

import { IoAdd } from "react-icons/io5";
import { useUser } from "../../utils/Contexte/UserContext/userContexte";
import NavItem from "./components/navItem";

import { useParams } from "react-router-dom";
import { useProject } from "../../utils/Contexte/ProjectContext/projectContexte";

interface SecondNavProps {
  TogglePojectCreation: () => void;
}

function SecondNav({ TogglePojectCreation }: SecondNavProps) {
  const { user, projects } = useUser();
  const { projectStatus } = useProject();
  const [show, setShow] = useState(false);
  const [showNav, setshowNav] = useState(true);
  const toggleVisibility = () => {
    setShow(!show);
  };

  const { id: projectId } = useParams<{ id: string }>();
  return (
    <div
      className={
        "min-h-[87vh] relative transition-all duration-500" +
        `
        ${showNav ? "" : "w-5  bg-purple-200"}   
        `
      }
    >
      <div>
        <div
          id="Main"
          className={
            " Nav justify-between items-start min-h-[87.8vh]  w-full sm:w-64 flex-col  border-black border-t-2 " +
            `
          ${showNav ? "" : "Navhidden"}
            `
          }
        >
          <div className="w-full ">
            <div className="flex justify-start  items-center  w-full ">
              <p className="text-2xl font-medium text-black w-full text-left py-5 px-2">
                Welcome{" "}
                <span className="font-bold font-mono text-purple-600 capitalize ">
                  {user?.name}
                </span>
              </p>
            </div>
            <div className="flex flex-col justify-start items-center w-full px-3  border-b">
              <div className="w-full flex items-center justify-between text-black  text-md pb-2 pl-2   font-bold">
                <span>Project</span>
                <span
                  className="font-bold text-lg bg-purple-500 p-2 rounded-full text-white cursor-pointer hover:bg-purple-300"
                  onClick={() => {
                    TogglePojectCreation();
                  }}
                >
                  <IoAdd />
                </span>
              </div>
              <div
                className=" flex items-center justify-between text-black font-semibold font-sans text-sm pb-2 pl-4 w-full rounded-md hover:cursor-pointer  "
                onClick={toggleVisibility}
              >
                <span>Recent</span>
                <span
                  className={
                    "transition-all duration-300 " +
                    `${show ? "rotate-180" : "rotate-0 "}`
                  }
                >
                  <IoMdArrowDropdown />
                </span>
              </div>
              <div
                id="menu1"
                className={
                  " justify-center  flex-col w-full  items-center pb-1 transition-all duration-300  " +
                  `${show ? "flex" : "hidden"}`
                }
              >
                {projects?.slice(0, 3).map((project) => (
                  <NavItem
                    key={project.id}
                    active={projectId == project.id ? true : false}
                    title={project.name ? project.name : ""}
                    to={`/home/projects/${project.id}`}
                    status={
                      projectStatus.find(
                        (state) => state.id === project.statusId
                      )?.name
                    }
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="w-full min-h-[30vh]  bg-purple-600 pt-4  pr-2 border-r-2 border-black">
            <span className="text-white  text-md pl-2 font-bold ">
              Add Members
            </span>
            <form action="" className="flex items-center justify-start">
              <input
                type="number"
                placeholder="Entre Member Id  "
                className="rounded-md flex-1 border-purple-600/50  py-2 px-2 text-white pl-2 text-sm font-bold bg-purple-300 "
              />
              <button className="flex-0 ">
                <span className=" p-2.5 rounded-lg bg-white text-purple-500 font-bold text-xl flex items-center justify-center">
                  <IoAdd />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
      <div
        className={
          "transition-all  duration-300 flex justify-center items-center w-10 h-10 bg-white text-purple-900 text-lg font-bold cursor-pointer rounded-full  absolute top-0 right-0 translate-x-5 translate-y-5 z-10" +
          `
        ${showNav ? "" : "rotate-180"}`
        }
        onClick={() => setshowNav(!showNav)}
      >
        <IoIosArrowDropright />
      </div>
    </div>
  );
}
export default SecondNav;
