import { Button as FbButton, Tabs, TabsRef } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { FaPerson } from "react-icons/fa6";
import { HiAdjustments, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { PopUpType } from "../../models/utils";
import { leaveProject } from "../../network/ProjectApi";
import { useProject } from "../../utils/Contexte/ProjectContext/projectContexte";
import { useUser } from "../../utils/Contexte/UserContext/userContexte";
import MembersComponent from "../MembersComponent/main";
import ModalUnstyled from "../ProjectComponent/components/modal";
import ProjectModifModal from "../ProjectComponent/projectModifModal";
import Summary from "../Summary/main";
import TaskContainer from "../TaskComponent/TaskListing/taskContainer";
import KanbanBoard from "./kanbanBoard";

const MainProjectManip = () => {
  const { project, tasks, taskStatus, projectImg, createStatus } = useProject();
  const tabsRef = useRef<TabsRef>(null);
  const { updateActiveTasks, updateProjects, activeTasks, projects } =
    useUser();
  const [activeTab, setActiveTab] = useState(0);
  const [showTasks, setShowTasks] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (activeTab === 3) {
      setShowTasks(true);
    } else {
      setShowTasks(false);
    }
  }, [activeTab]);

  const [updateProjectData, setUpdateProjectData] = useState<boolean>(false);
  const [showLeaveProject, setShowLeaveProject] = useState<boolean>(false);
  function LeaveProject() {
    async function handleLeaveProject() {
      // leave project
      if (project?.id) {
        await leaveProject(project?.id);
        updateUserContext();
        navigate("/home");
        setShowLeaveProject(false);
      }
    }
    function updateUserContext() {
      // remove project from user projects
      const newProjects =
        projects?.filter(
          (proj) => proj?.id?.toString() !== project?.id?.toString()
        ) || [];
      updateProjects(newProjects);
      //remove tasks from user tasks
      const newAssigneedTasks =
        activeTasks?.assigned.filter(
          (task) => task?.projectId?.toString() !== project?.id?.toString()
        ) || [];
      const newCreatedTasks =
        activeTasks?.created.filter(
          (task) => task?.projectId?.toString() !== project?.id?.toString()
        ) || [];
      updateActiveTasks({
        assigned: newAssigneedTasks,
        created: newCreatedTasks,
      });
    }
    handleLeaveProject();
  }
  function handleCancelLeaveProject() {
    setShowLeaveProject(false);
  }

  return (
    <div className="flex flex-col flex-shrink w-full  min-h-[90vh] bg-purple-600">
      {showLeaveProject && (
        <ModalUnstyled
          mainData={"confirm you wanna leave"}
          secondData={
            "leaving means u will  not be able to access the project again and all ur permissions will be lost "
          }
          onApproval={LeaveProject}
          onDisapproval={handleCancelLeaveProject}
          type={PopUpType.Failed}
        />
      )}
      {!updateProjectData && (
        <section>
          <div className=" flex items-center justify-between relative">
            <div className="w-full flex items-center justify-between px-5 pt-2">
              <div className="flex items-center justify-start  gap-3 p-3">
                <img
                  src={projectImg}
                  alt="projectIcon"
                  className="w-12 h-12 rounded-full"
                />
                <span className="text-md italic text-white font-bold flex flex-col-reverse">
                  {project?.name}
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
              <div className="flex items-center justify-center gap-10">
                <FbButton
                  gradientMonochrome="info"
                  className="bg-red-400 py-2 text-white  px-2 hover:bg-red-600 text-nowrap"
                  onClick={() => setShowLeaveProject(true)}
                >
                  <HiAdjustments className="mr-3 h-4 w-4" />
                  Leave Project
                </FbButton>
                <FbButton
                  gradientMonochrome="info"
                  className="bg-white py-2 text-purple-500  px-2 hover:bg-purple-100 hover:text-purple-900 text-nowrap"
                  onClick={() => {
                    setActiveTab(0);
                    setUpdateProjectData(true);
                  }}
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
                <Summary />
              </Tabs.Item>
              <Tabs.Item active title="Board" icon={MdDashboard}>
                <KanbanBoard
                  taskStatus={taskStatus}
                  projectTasks={tasks}
                  createStatus={createStatus}
                />
              </Tabs.Item>
              <Tabs.Item title="Members" icon={FaPerson}>
                <MembersComponent />
              </Tabs.Item>
              <Tabs.Item title="Tasks" icon={HiAdjustments}>
                {showTasks && (
                  <TaskContainer key={project?.id} isVisible={showTasks} />
                )}
              </Tabs.Item>
            </Tabs>
          </div>
        </section>
      )}
      {updateProjectData && (
        <ProjectModifModal onCancelModif={() => setUpdateProjectData(false)} />
      )}
    </div>
  );
};

export default MainProjectManip;
