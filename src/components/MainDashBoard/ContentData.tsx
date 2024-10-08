import { Button } from "@mui/material";
import ProjectContainer from "../ProjectComponent/projectComponent";
import TaskContainer from "../TaskComponent/taskComponent";
import "../../styles/Global.css";
import { useUser } from "../../utils/Contexte/UserContext/userContexte";
import { Link } from "react-router-dom";
const MainData = () => {
  const { projects, activeTasks } = useUser();

  return (
    <main className="w-full h-full -z-10 ">
      <div>
        <div className="w-full h-auto flex items-center justify-start ml-16">
          <h1 className="font-mono font-bold  text-2xl text-black py-5 capitalize">
            Your work
          </h1>
        </div>
        <hr className="  bg-black  -z-10 relative" />
        <div className="w-full max-h-[45vh] h-5/6  project-container">
          <div className="2xl:w-5/6 w-full mx-auto py-3 flex items-center justify-end px-5">
            <Link to={"/home/projects/"}>
              <Button
                variant="text"
                className="text-md text-purple-500 lowercase font-serif hover:cursor-pointer"
              >
                Join new Projects
              </Button>
            </Link>
          </div>
          <div className="w-full h-max">
            <ProjectContainer projects={projects} />
          </div>
        </div>
      </div>
      <div>
        <div className="w-full h-auto flex items-center justify-end -ml-20">
          <h1 className="font-mono font-bold  text-2xl text-black py-5 capitalize">
            Worked On
          </h1>
        </div>
        <hr className="  bg-black  -z-10 relative" />
        <div className="w-full   ">
          <div className="w-full h-max">
            <TaskContainer activeTasks={activeTasks} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainData;
