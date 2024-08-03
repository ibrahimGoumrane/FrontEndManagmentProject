// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { useState } from "react";
import { Task } from "../../models/Tasks";
import { Button } from "@mui/material";
import { MdDone } from "react-icons/md";
import { useEffect, useState } from "react";
import { getProjectData } from "../../network/ProjectApi";
import { Project } from "../../models/Projects";
import { User } from "../../models/Users";
import { getUserData } from "../../network/UserApi";
import { formatDateTime } from "../../utils/utility";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const [taskData, settasksData] = useState<Task>(task);
  const [taskProject, setTaskProject] = useState<Project | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  useEffect(() => {
    async function fetchProjectData() {
      if (taskData.projectId) {
        const projectData = await getProjectData(taskData.projectId);
        setTaskProject(projectData);
        if (taskData.AssigneeId !== null) {
          if (taskData?.AssigneeId !== undefined) {
            const userInfo = await getUserData(taskData.AssigneeId);
            setUserData(userInfo);
          }
        }
      }
      settasksData(task);
    }
    fetchProjectData();
  }, [task]);
  return (
    <Button
      variant="text"
      className="w-full h-15 block"
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
        <div className="flex items-center justify-center gap-5 font-mono font-light text-sm italic lowercase ">
          <div className="rounded-full  font-extrabold text-md p-3 bg-purple-500 text-white hover:bg-white hover:-translate-y-1 translate-y-0 hover:text-purple-900 duration-300">
            <MdDone />
          </div>
          <div className="text-xs text-left flex items-start justify-center flex-col ">
            <p>{taskData?.name}</p>
            <p className="flex items-start justify-start gap-1 flex-col">
              <span>
                {taskData?.endDate
                  ? formatDateTime(taskData?.endDate)
                  : "No due Data foud"}
              </span>
              <span className="uppercase text-purple-900">
                {taskProject?.name}
              </span>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-5 font-mono font-light text-gray-500 ">
          <div>Assigned To :</div>
          <div>{userData?.name ? userData?.name : "Not Assigned yet"} </div>
        </div>
      </div>
    </Button>
  );
}
