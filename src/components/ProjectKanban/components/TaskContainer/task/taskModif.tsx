import { useEffect, useMemo, useRef, useState } from "react";
import { TaskModification } from "../../../../../models/Tasks";
import { User } from "../../../../../models/Users";
import { getUserData } from "../../../../../network/UserApi";
import { useProject } from "../../../../../utils/Contexte/ProjectContext/projectContexte";
import { useTask } from "../../../../../utils/Contexte/TaskContext/taskContexte";
import { useUser } from "../../../../../utils/Contexte/UserContext/userContexte";
import CommentCreation from "./commentCreation";
import CommentDU from "./commentDU";
import MainTaskData from "./mainTaskData";

interface taskModifProps {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskModifModel = ({ setEditMode }: taskModifProps) => {
  const { user } = useUser();
  const { comments, updateTask, task, updateComments } = useTask();
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
              <div className="font-mono text-3xl  text-white relative effect inline-block">
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
                className={`italic lowercase font-bold text-purple-500  text-wrap pl-2    font-mono text-md relative flex-grow-0   flex items-start  justify-start w-full bg-white rounded-md  h-32
                  ${updateDescription ? "hidden" : ""}`}
                onClick={() => setupdateDescription(true)}
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: taskState?.description
                      ? taskState?.description
                      : "Entre a description",
                  }}
                  className=" max-h-32 overflow-x-hidden overflow-y-auto task"
                ></span>
              </div>
              <div
                className={` lowercase font-semibold  text-wrap font-sans text-xs relative flex-grow-0  flex items-start  justify-start w-full bg-white rounded-md  h-40
                  ${updateDescription ? "" : "hidden"}`}
                onBlur={updateTaskData}
              >
                <textarea
                  name=""
                  id=""
                  value={description}
                  onChange={DescriptionHandler}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.shiftKey) updateTaskData();
                  }}
                  placeholder="Enter a description to Your project"
                  className="w-full h-full rounded-md resize-none task border-none"
                ></textarea>{" "}
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
                            onDeletedSuccessfuly={(commentId) => {
                              const newComments = comments.filter(
                                (com) => com.id !== commentId
                              );
                              updateComments(newComments);
                            }}
                            onUpdatedSuccessfully={(comment) => {
                              const newComments = [
                                ...comments.filter(
                                  (com) => com.id !== comment.id
                                ),
                                comment,
                              ];
                              updateComments(newComments);
                            }}
                          />
                        )
                    )}
                </div>
                <button
                  className={`text-xs hover:bg-purple-100 duration-300 px-3 py-2 border-xl bg-white rounded-xl mt-2 text-purple-500 lowercase font-serif hover:cursor-pointer self-end ${
                    comments?.length ? "" : "hidden"
                  }`}
                >
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
