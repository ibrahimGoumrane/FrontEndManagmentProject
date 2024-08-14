import { Flowbite, type CustomFlowbiteTheme } from "flowbite-react";
import { useProject } from "../../utils/Contexte/ProjectContext/projectContexte";
import MainProjectManip from "./main";
import SecondNav from "../SecondNav/SecondNav";

const customTheme: CustomFlowbiteTheme = {
  tabs: {
    base: "flex-1 flex flex-col gap-2 max-w-[100%] overflow-x-hidden overflow-y-hidden",
    tablist: {
      base: "flex text-center items-center justify-between min-w-full gap-32  self-start ",
      tabitem: {
        base: "flex items-center w-52 gap-2 flex items-center justify-center rounded-t-lg p-4 text-md font-bold first:ml-0 focus:outline-none  disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500",
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
      base: "flex-1 ",
    },
  },
  carousel: {
    control: {
      base: "flex items-center justify-center w-10 h-10 bg-white rounded-full text-slate-900 shadow-xl",
      icon: "h-5 w-5 text-purple-500 dark:text-gray-800 sm:h-6 sm:w-6",
    },
  },
};

interface MainProjectDataProps {
  TogglePojectCreation: () => void;
}

const MainProjectData = ({ TogglePojectCreation }: MainProjectDataProps) => {
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
          <SecondNav TogglePojectCreation={TogglePojectCreation} />
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
