import { Button } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { TaskModification } from "../../../../../models/Tasks";
import { User } from "../../../../../models/Users";
import { getUserData } from "../../../../../network/UserApi";
import { useProject } from "../../../../../utils/Contexte/ProjectContext/projectContexte";
import { useTask } from "../../../../../utils/Contexte/TaskContext/taskContexte";
import { useUser } from "../../../../../utils/Contexte/UserContext/userContexte";
import CommentCreation from "./commentCreation";
import MainTaskData from "./mainTaskData";
import CommentDU from "./commentDU";

interface taskModifProps {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskModifModel = ({ setEditMode }: taskModifProps) => {
  const { user } = useUser();
  const { comments, updateTask, task } = useTask();
  const { taskStatus } = useProject();

  const [taskState, setTasks] = useState(task);
  const [userData, setUserData] = useState<User | null>(null);
  const [description, setDescription] = useState("");
  const [updateDescription, setupdateDescription] = useState<boolean>(false);
  const saveDescriptionButton = useRef<HTMLDivElement | null>(null);

  const DescriptionHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setDescription(newValue);
  };
  useEffect(() => {
    if (
      description.toString().localeCompare(taskState?.description || "") != 0
    ) {
      if (saveDescriptionButton.current) {
        saveDescriptionButton.current.style.display = "block";
      }
    } else {
      if (saveDescriptionButton.current) {
        saveDescriptionButton.current.style.display = "none";
      }
    }
  }, [description]);
  
  const updateTaskData = () => {
    updateTask({ description: description });
    setupdateDescription(false);
    if (saveDescriptionButton.current) {
      saveDescriptionButton.current.style.display = "none";
      setDescription("");
    }
  };
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
  const ToggleShowModif = () => setShowTaskModif(!showTaskModif);
  const onSubmitSuccessfull = (task: TaskModification) => {
    updateTask(task);
  };

  return (
    <div className="mainBg ">
      <div className="flex h-5/6 w-[80vw] items-center justify-center ">
        <div className="bg-purple-400  p-10 rounded-l-md mt-10 flex items-start justify-start  flex-col h-full w-full ">
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

            <div className="flex items-start justify-start flex-col  w-full">
              <span className="text-2xl italic font-serif font-light text-white  mb-1 inline-block">
                Description
              </span>
              <div
                className={`text-black  font-mono text-md relative  flex items-start p-2 justify-start w-full bg-white rounded-md after:border after:border-white after:rounded-md after:hidden min-h-20 after:absolute after:content-['Edit'] after:top-0 after:left-0 after:w-full after:h-full after:hover:flex after:text-purple-200 after:items-center after:justify-center after:bg-black/40  after:transition-all after:duration-300
                  ${updateDescription ? "hidden" : ""}`}
                onClick={() => setupdateDescription(true)}
              >
                <span className="italic lowercase font-bold text-purple-500">
                  {taskState?.description}
                </span>
              </div>
              <div
                className={
                  "w-full rounded-md  relative " +
                  `${updateDescription ? "" : "hidden"}`
                }
              >
                <textarea
                  name=""
                  id=""
                  value={description ? description : ""}
                  onChange={DescriptionHandler}
                  placeholder="Enter a description to Your project"
                  className="w-full h-32 rounded-md resize-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.shiftKey) return;
                  }}
                ></textarea>{" "}
                <div
                  className="absolute right-0 -bottom-10 hidden"
                  ref={saveDescriptionButton}
                >
                  <Button
                    variant="contained"
                    color="success"
                    type="submit"
                    className="w-full text-nowrap h-full z-30"
                    onClick={updateTaskData}
                  >
                    Save Description
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="basis-2/3 w-full h-full  flex flex-col">
            <h1 className="font-mono text-3xl italic  text-white relative task inline-block">
              Comments
            </h1>
            <div className="h- flex items-start flex-col basis-5/6 justify-start space-y-5 mt-2">
              {user?.id && task?.id && (
                <CommentCreation idUser={+user?.id} idTask={+task?.id} />
              )}
              <div className=" grow-0 shrink-0  overflow-y-auto overflow-x-hidden h-full w-full flex flex-col">
                <div className="flex items-start justify-start flex-col w-full space-y-2 ">
                  {comments
                    ?.slice()
                    .reverse()
                    .slice(0, 3)
                    .map(
                      (comment, index) =>
                        user?.id && (
                          <CommentDU
                            key={index}
                            comment={comment}
                            userId={+user?.id ?? 0}
                          />
                        )
                    )}
                </div>
                <button className="text-xs hover:bg-purple-100 duration-300 px-3 py-2 border-xl bg-white rounded-xl mt-2  text-purple-500 lowercase font-serif hover:cursor-pointer self-end">
                  View All
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className=" bg-purple-400  rounded-r-md mt-10  flex items-center justify-center flex-col h-full w-1/2">
          <MainTaskData
            taskState={taskState!}
            setEditMode={setEditMode}
            showTaskModif={showTaskModif}
            ToggleShowModif={ToggleShowModif}
            onSubmitSuccessfull={onSubmitSuccessfull}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskModifModel;
