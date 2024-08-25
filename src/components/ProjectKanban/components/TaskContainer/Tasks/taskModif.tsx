import { useEffect, useRef, useState } from "react";
import { TaskModification } from "../../../../../models/Tasks";
import { PopUpType } from "../../../../../models/utils";
import { useTask } from "../../../../../utils/Contexte/TaskContext/taskContexte";
import { useUser } from "../../../../../utils/Contexte/UserContext/userContexte";
import PopUp from "../../../../utils/popUp";
import CommentCreation from "./commentCreation";
import CommentDU from "./commentDU";
import MainTaskData from "./mainTaskData";

interface taskModifProps {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskModifModel = ({ setEditMode }: taskModifProps) => {
  const { user } = useUser();
  const { comments, updateTask, task } = useTask();

  const [taskState, setTasks] = useState(task);
  const [description, setDescription] = useState("");
  const [updateDescription, setupdateDescription] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const DescriptionHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setDescription(newValue);
  };

  const handleUpdateDescription = () => {
    setupdateDescription(true);
    descriptionRef.current?.focus();
  };

  const updateTaskData = async () => {
    try {
      await updateTask({ description: description });
      setupdateDescription(false);
    } catch (error) {
      if (task?.description) {
        setDescription(task?.description);
      }
      setupdateDescription(false);
      setErrorText((error as Error).message);
    }
  };
  useEffect(() => {
    setTasks(task);
    if (task?.description) {
      setDescription(task?.description);
    }
  }, [task]);

  const onSubmitSuccessfull = async (task: TaskModification) => {
    await updateTask(task);
  };

  return (
    <div className="absolute inset-0 z-50 bg-gray-200/30 flex items-start  justify-center">
      {errorText && (
        <PopUp
          type={PopUpType.Failed}
          message={errorText}
          setSuccess={() => setErrorText("")}
        />
      )}
      <div className="flex mt-12 items-center justify-center bg-purple-500 p-10 rounded-lg gap-10 h-5/6">
        <div className="flex items-start justify-start flex-col h-full w-[30vw]">
          <div className="flex flex-col items-start w-full gap-1 my-5 text-black text-nowrap text-left  basis-1/3">
            <div className="flex items-start justify-start flex-col  w-full">
              <div className="text-xl  italic capitalize text-white text-left font-mono ">
                Description
              </div>
              <div
                className={`italic lowercase font-bold text-purple-500  text-wrap pl-2    font-mono text-md relative flex-grow-0   flex items-start  justify-start w-full bg-white rounded-md  h-32
                  ${updateDescription ? "hidden" : ""}`}
                onClick={handleUpdateDescription}
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
              >
                <textarea
                  name=""
                  id=""
                  onBlur={updateTaskData}
                  ref={descriptionRef}
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
          <div className="basis-2/3 w-full h-full flex flex-col mt-auto">
            <div className="text-xl  italic capitalize  text-white  text-left font-mono ">
              Comments
            </div>
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
        <MainTaskData
          setEditMode={setEditMode}
          onSubmitSuccessfull={onSubmitSuccessfull}
        />
      </div>
    </div>
  );
};

export default TaskModifModel;
