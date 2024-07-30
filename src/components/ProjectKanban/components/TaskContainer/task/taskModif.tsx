import { Avatar } from "@mui/material";
import { teal } from "@mui/material/colors";
import TaskModif from "../../../../ProjectTaskTeamForms/Tasks/TaskModif";
import { IoIosArrowDown } from "react-icons/io";
import { useState, useEffect, useMemo } from "react";
import { TaskModification } from "../../../../../models/Tasks";
import { useTask } from "../../../../../utils/Contexte/TaskContext/taskContexte";
import { useProject } from "../../../../../utils/Contexte/ProjectContext/projectContexte";
import { User } from "../../../../../models/Users";
import { getUserData } from "../../../../../network/UserApi";

interface taskModifProps {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskModifModel = ({ setEditMode }: taskModifProps) => {
  const { updateTask, task } = useTask();
  const { taskStatus } = useProject();

  const [taskState, setTasks] = useState(task);
  const [userData, setUserData] = useState<User | null>(null);
  const [commentValue, setCommentValue] = useState<string>("");
  const [description, setDescription] = useState("");
  const State = useMemo(() => {
    const returnedValue = taskStatus.find(
      (state) => state.id === taskState?.statusId
    );
    return returnedValue;
  }, [taskState, taskStatus]);
  useEffect(() => {
    async function fetchData() {
      setTasks(task);
      if (task?.AssigneeId !== null) {
        if (task?.AssigneeId !== undefined) {
          const userInfo = await getUserData(task.AssigneeId);
          setUserData(userInfo);
        }
      }
      if (task?.description) {
        setDescription(task?.description);
      }
    }
    fetchData();
  }, [task]);

  const [showTaskModif, setShowTaskModif] = useState(true);
  const ToggleShowModif = () => [setShowTaskModif(!showTaskModif)];
  const onSubmitSuccessfull = (task: TaskModification) => {
    updateTask(task);
  };

  return (
    <div className="mainBg">
      <div className="flex h-4/6 w-[60vw] items-center justify-center">
        <div className="bg-purple-400 p-10 rounded-l-md mt-10 flex items-start justify-start  flex-col h-full w-full">
          <div className="flex flex-col items-start w-full gap-1 my-5 text-black text-nowrap text-left  basis-1/3">
            <h1 className="font-light  duration-150 italic ">
              <div className="font-mono text-3xl  text-white relative task inline-block">
                <span>{taskState?.name}</span>
                <span className="font-light text-sm absolute bottom-0 right-0  text-black">
                  {State?.name}
                </span>
              </div>
              <div>
                <span className="text-white font-mono text-xl">
                  Assigned to :{" "}
                </span>
                <span className="text-black  font-mono text-sm">
                  {userData?.name ? userData?.name : "No Assign Yet"}
                </span>
              </div>
            </h1>

            <p className="flex items-start justify-start flex-col my-2 w-full">
              <span className="text-2xl italic font-serif font-light text-white  mb-1">
                Description
              </span>
              <textarea
                name=""
                id=""
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a description to Your project"
                className="w-full h-32 rounded-md resize-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.shiftKey) return;
                }}
              ></textarea>{" "}
            </p>
          </div>
          <div className="basis-2/3 w-full h-full">
            <h1 className="font-mono text-3xl italic  text-white relative task">
              Comments
            </h1>
            <div className="h-max flex items-center justify-center gap-8 mt-5">
              <Avatar
                alt="Remy Sharp"
                sx={{
                  bgcolor: teal[600],
                  width: "40px",
                  height: "40px",
                }}
                component="div"
              />
              <textarea
                name=""
                id=""
                value={commentValue}
                onChange={(e) => setCommentValue(e.target.value)}
                placeholder="Enter a comment about your Project"
                className="w-full h-full rounded-md resize-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.shiftKey) return;
                }}
              ></textarea>
            </div>
          </div>
        </div>
        <div className=" bg-purple-400  rounded-r-md mt-10  flex items-center justify-center flex-col h-full w-1/2">
          <div className={`rounded-xl w-3/4 mt-3`}>
            <div
              className="flex justify-between items-center w-full bg-white h-30 rounded-md px-4 py-3"
              onClick={ToggleShowModif}
            >
              <div className="text-xl  italic capitalize text-purple-400 text-left">
                Settings
              </div>
              <div
                className={`text-purple-400 font-extrabold text-2xl ${
                  showTaskModif ? "rotate-0" : "-rotate-180"
                }   duration-150 transition-all`}
              >
                <IoIosArrowDown />
              </div>
            </div>
            <div
              className={
                showTaskModif
                  ? "flex items-center justify-center "
                  : "invisible flex items-center justify-center "
              }
            >
              <TaskModif
                task={taskState}
                onSubmitSuccessfull={onSubmitSuccessfull}
                onTaskModifError={() => {}}
                onCancelCreation={() => {
                  setEditMode(false);
                }}
                projectId={0}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModifModel;
