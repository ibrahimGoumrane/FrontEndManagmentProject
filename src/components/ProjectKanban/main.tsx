import { Button as FbButton, Tabs, TabsRef } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { FaPerson } from "react-icons/fa6";
import { HiAdjustments, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { autorisationModel } from "../../models/auth";
import { Project, ProjectModif } from "../../models/Projects";
import type { ProjectStatus, TaskStatus } from "../../models/Status";
import type { Task } from "../../models/Tasks";
import MembersComponent from "../MembersComponent/main";
import ProjectModifModal from "../ProjectComponent/projectModifModal";
import Summary from "../Summary/main";
import TaskContainer from "../TaskComponent/TaskListing/taskContainer";
import KanbanBoard from "./kanbanBoard";

interface ComponentProps {
  project: Project;
  tasks: Task[];
  projectStatus: ProjectStatus[];
  projectState: ProjectStatus;
  projectImg: string;
  members: autorisationModel[];
  taskStatus: TaskStatus[];
  updateProject: (newProject: ProjectModif | null) => Promise<void>;
  updateMembers: (
    users: autorisationModel[],
    saveTodb: boolean
  ) => Promise<void>;
  updateProjectState: (state: ProjectStatus) => Promise<void>;
  createStatus: (newTaskStatus: TaskStatus) => void;
}

const MainProjectManip = ({
  project,
  tasks,
  projectStatus,
  projectState,
  members,
  projectImg,
  taskStatus,
  updateProject,
  updateMembers,
  updateProjectState,
  createStatus,
}: ComponentProps) => {
  const tabsRef = useRef<TabsRef>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [showTasks, setShowTasks] = useState(false);
  useEffect(() => {
    if (activeTab === 3) {
      setShowTasks(true);
    } else {
      setShowTasks(false);
    }
  }, [activeTab]);
  const [updateProjectData, setUpdateProjectData] = useState<boolean>(false);
  function updateProjectInfo(newProject: ProjectModif | null) {
    updateProject(newProject);
    updateProjectState({
      id: newProject?.statusId || -1,
      name: "",
    });
    setTimeout(() => {
      setUpdateProjectData(false);
    }, 1200);
  }

  return (
    <div className="flex flex-col flex-shrink w-full  min-h-[90vh] bg-purple-600">
      {!updateProjectData && (
        <section>
          <div className=" flex items-center justify-between relative">
            <div className="w-full flex items-center justify-between px-5 pt-2">
              <div className="flex items-center justify-start  gap-3 p-3">
                <img
                  src={projectImg}
                  alt="projectIcon"
                  className="max-w-12 max-h-12 rounded-full"
                />
                <span className="text-md italic text-white font-bold flex flex-col-reverse">
                  {project.name}
                  <span>
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </span>
              </div>
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
            <hr className="w-1/2 absolute left-1/4 bottom-2 border-2 border-white" />
          </div>

          <div className="flex items-center justify-between px-5 ">
            <Tabs
              aria-label="Default tabs"
              variant="default"
              ref={tabsRef}
              onActiveTabChange={(tab) => setActiveTab(tab)}
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
                  createStatus={createStatus}
                />
              </Tabs.Item>
              <Tabs.Item title="Members" icon={FaPerson}>
                <MembersComponent
                  members={members}
                  updateMembers={updateMembers}
                />
              </Tabs.Item>
              <Tabs.Item
                title="Tasks"
                icon={HiAdjustments}
                onClick={() => tabsRef.current?.setActiveTab(0)}
              >
                <TaskContainer tasksData={tasks} isVisible={showTasks} />
              </Tabs.Item>
            </Tabs>
          </div>
        </section>
      )}
      {updateProjectData && (
        <ProjectModifModal
          onUpdatedSuccessfully={updateProjectInfo}
          onCancelModif={() => setUpdateProjectData(false)}
        />
      )}
    </div>
  );
};

export default MainProjectManip;
