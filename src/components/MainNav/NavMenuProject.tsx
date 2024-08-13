"use client";
import { Dropdown } from "flowbite-react";
import { useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useUser } from "../../utils/Contexte/UserContext/userContexte";
import { Link } from "react-router-dom";

interface DropDownNavProps {
  name: string;
  TogglePojectCreation: () => void;
}
function NavMenu({ name, TogglePojectCreation }: DropDownNavProps) {
  const { projects } = useUser();

  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      if (event.ctrlKey && event.key === "P" && event.shiftKey) {
        TogglePojectCreation();
      }
    });
  }, [TogglePojectCreation]);

  return (
    <Dropdown
      label={
        <span className="text-purple-700 text-xl font-mono font-bold inline-flex items-center justify-center gap-1 capitalize focus:border-purple-500 focus:outline-none">
          {name} <MdKeyboardArrowDown />
        </span>
      }
    >
      <Dropdown.Header className="border-b-2 border-purple-400 ">
        Recent Projects
      </Dropdown.Header>
      <Dropdown.Divider />
      {projects?.length !== 0 ? (
        projects?.slice(0, 3).map((project, index) => (
          <Link to={"/home/projects/" + project.id} key={index}>
            <Dropdown.Item id={`${project.id}`}>
              P{index + 1} : {project.name}
            </Dropdown.Item>
          </Link>
        ))
      ) : (
        <Dropdown.Header className=" border-purple-400 font-sans text-xs text-purple-900  ">
          No Project available
        </Dropdown.Header>
      )}
      <Dropdown.Divider className="h-0.5 w-full bg-purple-400" />
      <Dropdown.Item>View Details</Dropdown.Item>

      <Dropdown.Item onClick={TogglePojectCreation}>
        Create Projects
      </Dropdown.Item>
    </Dropdown>
  );
}
export default NavMenu;
