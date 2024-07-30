// KanbanBoard.jsx
import type { CustomFlowbiteTheme } from "flowbite-react";
import { Button as FbButton, Flowbite, Tabs } from "flowbite-react";
import { useState } from "react";
import { FaCat } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { HiAdjustments, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { Project } from "../../models/Projects";
import { useProject } from "../../utils/Contexte/ProjectContext/projectContexte";
import MembersComponent from "../MembersComponent/main";
import UpdateProject from "../ProjectTaskTeamForms/Project/ProjectModif";
import Summary from "../Summary/main";
import KanbanBoard from "./kanbanBoard";

const customTheme: CustomFlowbiteTheme = {
  tabs: {
    tablist: {
      base: "flex text-center items-center justify-between gap-10 w-[40vw]",
      tabitem: {
        base: "flex items-center gap-2 flex items-center justify-center rounded-t-lg p-4 text-md font-medium first:ml-0 focus:outline-none  disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500",
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
  },
};

const MainProjectManip = () => {
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

  const [updateProjectData, setUpdateProjectData] = useState<boolean>(false);

  function updateProjectInfo(newProject: Project | null) {
    updateProject(newProject);
    updateProjectState({
      id: newProject?.statusId || -1,
      name: "",
    });
    setUpdateProjectData(false);
  }

  return (
    <Flowbite theme={{ theme: customTheme }}>
      {!updateProjectData && (
        <main className="w-[84.6vw] h-[92vh] fixed left-[15.5vw] top-[8vh] kanbanBoard -z-30 flex  pt-8  pl-2 px-[40px] flex-col ">
          <div className="w-full flex items-center justify-between relative">
            <div className="flex items-center justify-start h-full w-full gap-3 p-3">
              <span className="rounded-full h-10 p-1 flex items-center justify-center  w-10 text-xl bg-white text-purple-600">
                <FaCat />
              </span>
              <span className="text-md  italic text-white font-bold flex flex-col-reverse">
                project Name
                <span>
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </span>
              <hr className="w-1/2 absolute left-1/4 -bottom-3 border-2 border-white" />
            </div>
          </div>

          <div className="p-6 flex w-full items-start justify-between px-5 relative">
            <Tabs
              aria-label="Default tabs"
              variant="default"
              className="flex gap-10 text-white "
            >
              <Tabs.Item
                title="Summary"
                icon={HiUserCircle}
                className=" active:bg-white"
              >
                <Summary
                  project={project}
                  tasks={tasks}
                  projectStatus={projectStatus}
                  projectState={projectState}
                  members={members}
                  taskStatus={taskStatus}
                />
              </Tabs.Item>
              <Tabs.Item active title="Board" icon={MdDashboard}>
                <KanbanBoard
                  projectId={project?.id || -1}
                  taskStatus={taskStatus}
                  projectTasks={tasks}
                  updateTasks={updateTasks}
                  updateTaskStatus={updateTaskStatus}
                />
              </Tabs.Item>
              <Tabs.Item title="Members" icon={FaPerson}>
                <MembersComponent
                  members={members}
                  updateMembers={updateMembers}
                />
              </Tabs.Item>
              <Tabs.Item title="Tasks" icon={HiAdjustments}></Tabs.Item>
            </Tabs>
            <div>
              <FbButton
                gradientMonochrome="info"
                className="bg-white py-2 text-purple-500  px-3 hover:bg-purple-100 hover:text-purple-900 text-nowrap"
                onClick={() => setUpdateProjectData(true)}
              >
                <HiAdjustments className="mr-3 h-4 w-4" />
                Project Settings
              </FbButton>
            </div>
          </div>
        </main>
      )}
      {updateProjectData && (
        <UpdateProject
          onUpdatedSuccess={updateProjectInfo}
          onDismiss={() => setUpdateProjectData(false)}
        />
      )}
    </Flowbite>
  );
};

export default MainProjectManip;
