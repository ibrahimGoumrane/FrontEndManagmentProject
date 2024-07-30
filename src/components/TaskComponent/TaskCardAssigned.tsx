import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { MdDone } from "react-icons/md";
import { Project } from "../../models/Projects";
import { Task } from "../../models/Tasks";
import { getProjectData } from "../../network/ProjectApi";
import { TaskStatus } from "../../models/Status";
import { getTaskStatus } from "../../network/StatusApi";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const [taskData, settasksData] = useState<Task>(task);
  const [taskProject, setTaskProject] = useState<Project | null>(null);
  const [statusData, setStatusData] = useState<TaskStatus | null>(null);
  useEffect(() => {
    async function fetchProjectData() {
      if (taskData.projectId) {
        const projectData = await getProjectData(taskData.projectId);
        setTaskProject(projectData);
      }
      if (taskData.statusId) {
        if (taskData.projectId) {
          const status = await getTaskStatus(taskData.projectId);
          // Rest of the code...
          const taskState = status.find((state) => {
            if (state.id === taskData.statusId) {
              return state;
            }
          });
          setStatusData(taskState || null);
        }
      }
      settasksData(task);
    }
    fetchProjectData();
  }, [task]);
  return (
    <Button
      variant="text"
      className=" h-15 block"
      color="primary"
      size="large"
      sx={{
        backgroundColor: "white",
        boxShadow: "0 0 0 1px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.1)",
        borderRadius: "0.5rem",
        padding: "1rem",
        marginBottom: "1rem",
        "&:hover": {
          backgroundColor: "#f9f9f9",
        },
        display: "block",
        width: "100%",
      }}
    >
      <div className="w-full flex items-center justify-between ">
        <div className="flex items-center justify-start gap-5 font-mono font-light text-sm italic lowercase w-1/2">
          <div className="rounded-full  font-extrabold text-md p-3 bg-purple-500 text-white hover:bg-white hover:-translate-y-1 translate-y-0 hover:text-purple-900 duration-300">
            <MdDone />
          </div>
          <div className="text-xs text-left flex items-start justify-center flex-col ">
            <div className="">
              <p>{taskData?.name}</p>
              <span className="text-black italic text-md font-bold">
                {taskProject?.name}{" "}
              </span>
            </div>

            <span>
              {taskData?.startDate
                ? new Date(taskData.startDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "No Start Date foud"}
            </span>
            <p className="flex items-center justify-center gap-3">
              <span>Sp : {taskData.StoryPoint ? taskData.StoryPoint : -1}</span>
            </p>
          </div>
        </div>
        <div className="flex items-start justify-between  text-xs font-thin font-mono text-gray-500 flex-col w-2/5">
          <div className="flex items-center justify-center ">
            <div>Due Date :</div>
            <div>
              {" "}
              {taskData?.endDate
                ? taskData?.endDate.toDateString()
                : "No due Data foud"}
            </div>
          </div>
          <div className="flex items-center justify-center ">
            <div>Task State :</div>
            <div>
              {" "}
              {taskData?.statusId ? statusData?.name : "No State Found"}
            </div>
          </div>
        </div>
      </div>
    </Button>
  );
}
