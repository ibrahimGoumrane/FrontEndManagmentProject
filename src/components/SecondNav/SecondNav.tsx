import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import "./dropDown.css";
import { IoClose } from "react-icons/io5";
import { Typography } from "@mui/material";
import { IoMdAdd } from "react-icons/io";
import DropDownNav from "./DropDown";
import { useUser } from "../../utils/Contexte/UserContext/userContexte";
interface SecondNavProps {
  TogglePojectCreation: () => void;
}

function SecondNav({ TogglePojectCreation }: SecondNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { projects } = useUser();
  function handleClick() {
    setIsOpen(() => !isOpen);
  }
  return (
    <div className={"mainContainer z-10 " + `${isOpen ? "" : "closed"}`}>
      <div
        className={"xl:w-[13vw] bg-purple-500 h-screen relative rounded-r-2xl "}
      >
        <div className="w-full flex items-center justify-between mt-10 p-3 ">
          <Typography variant="h6" className=" text-white" fontWeight={700}>
            Projects
          </Typography>
          <button
            className="rounded-full p-3 bg-white w-10 h-10 flex items-center justify-center text-black hover:bg-purple-600 hover:text-white duration-150 transition-all"
            onClick={TogglePojectCreation}
          >
            <IoMdAdd />
          </button>
        </div>
        <div>
          <DropDownNav projects={projects} />
        </div>
      </div>
      <div className="pt-16">
        <button
          className="btnStyle bg-purple-900 text-white text-xl  "
          onClick={handleClick}
        >
          {isOpen ? <IoClose /> : <GiHamburgerMenu />}
        </button>
      </div>
    </div>
  );
}
export default SecondNav;
