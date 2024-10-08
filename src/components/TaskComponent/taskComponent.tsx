import { useEffect, useState } from "react";
import { Task } from "../../models/Tasks";
import TaskCardAssigned from "./TaskCardAssigned";
import TaskCardCreation from "./TaskCardCreation";

interface TaskContainerProps {
  activeTasks: {
    assigned: Task[];
    created: Task[];
  } | null;
}

export default function TaskContainer({ activeTasks }: TaskContainerProps) {
  const [assignedTasks, setAssignedTasks] = useState<Task[]>();
  const [createdTasks, setCreatedTasks] = useState<Task[]>();
  useEffect(() => {
    setAssignedTasks(activeTasks?.assigned);
    setCreatedTasks(activeTasks?.created);
  }, [activeTasks]);
  return (
    <div className="flex items-start justify-start w-[90%] mx-auto mt-5">
      <div className="w-full ">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-nowrap text-xl text-purple-400 font-mono font-light capitalize  ">
            assigned
          </h2>
          <div className="  py-3 flex items-center justify-between px-5"></div>
        </div>
        <div className=" overflow-x-auto max-h-[30vh] project-container">
          {assignedTasks?.length !== 0 &&
            assignedTasks?.map((task, index) => (
              <div
                key={index}
                className="hover:shadow-xl hover:shadow-gray-300 shadow-none duration-300 "
              >
                <TaskCardAssigned task={task} />
              </div>
            ))}
          {assignedTasks?.length === 0 && (
            <div className="gap-10 flex-col flex items-center justify-center font-serif w-full text-center">
              <div className="text-sm font-light">No Assigned Task's found</div>
            </div>
          )}
        </div>
      </div>
      <div className="w-full ">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-nowrap text-xl font-mono font-light capitalize  text-purple-400 ">
            Created
          </h2>
          <div className="  py-3 flex items-center justify-between px-5"></div>
        </div>
        <div className=" overflow-x-auto max-h-[30vh] project-container">
          {createdTasks?.length !== 0 &&
            createdTasks?.map((task, index) => (
              <div
                key={index}
                className="w-[90%] mx-auto hover:shadow-xl hover:shadow-gray-300 shadow-none duration-300 "
              >
                <TaskCardCreation task={task} />
              </div>
            ))}
          {createdTasks?.length === 0 && (
            <div className="gap-10 flex-col flex items-center justify-center font-serif w-full text-center">
              <div className="text-sm font-light">No Created Task's found</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
