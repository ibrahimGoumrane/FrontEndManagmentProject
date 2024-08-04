import { Flowbite, type CustomFlowbiteTheme } from "flowbite-react";
import { useProject } from "../../utils/Contexte/ProjectContext/projectContexte";
import MainProjectManip from "./main";
import SecondNav from "../SecondNav/SecondNav";

const customTheme: CustomFlowbiteTheme = {
  tabs: {
    base: "flex-1 flex flex-col gap-2 max-w-[100%] overflow-x-hidden overflow-y-hidden",
    tablist: {
      base: "flex text-center items-center justify-between gap-32  self-start ",
      tabitem: {
        base: "flex items-center w-40 gap-2 flex items-center justify-center rounded-t-lg p-4 text-md font-medium first:ml-0 focus:outline-none  disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500",
        variant: {
          default: {
            base: "rounded-t-lg bg-transparent text-white",
            active: {
              on: "bg-white text-purple-600",
              off: "text-white hover:bg-white hover:text-purple-600 dark:text-purple-400 dark:hover:bg-white dark:hover:text-purple-300",
            },
          },
        },
      },
    },
    tabitemcontainer: {
      base: "flex-1",
    },
  },
};

const MainProjectData = () => {
  const {
    project,
    tasks,
    projectStatus,
    projectState,
    members,
    taskStatus,
    updateProject,
    updateTasks,
    updateMembers,
    updateProjectState,
    updateTaskStatus,
  } = useProject();

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <section className="flex items-start justify-start min-h-[90vh]">
        <div className="flex-grow-0 flex-shrink-0  ">
          <SecondNav />
        </div>
        <div className="flex-grow flex-shrink min-w-0">
          <MainProjectManip
            project={project || {}}
            tasks={tasks}
            projectStatus={projectStatus}
            projectState={projectState || { id: -1, name: "" }}
            members={members}
            taskStatus={taskStatus}
            updateProject={updateProject}
            updateTasks={updateTasks}
            updateMembers={updateMembers}
            updateProjectState={updateProjectState}
            updateTaskStatus={updateTaskStatus}
          />
        </div>
      </section>
    </Flowbite>
  );
};

export default MainProjectData;
