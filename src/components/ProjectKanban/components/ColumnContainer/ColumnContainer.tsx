import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import { ColumnContainerProps } from "../../propsInterfaces/interfaces.ts";
import TrashIcon from "../PlusIcon/Trash";
import PlusIcon from "../PlusIcon/icons";
import TaskContainer from "../TaskContainer/taskContainer";
import { useProject } from "../../../../utils/Contexte/ProjectContext/projectContexte.ts";
import { PopUpType } from "../../../../models/utils.ts";
import PopUp from "../../../utils/popUp.tsx";

const ColumnContainer = ({
  state,
  deleteStatus,
  updateStatus,
  status,
  createTask,
  tasks,
  ownTasks,
  deleteTask,
  updateTask,
  errorMsg,
  setErrorMsg,
}: ColumnContainerProps) => {
  const {
    createTask: createT,
    deleteStatus: deleteS,
    updateStatus: updateS,
  } = useProject();
  const [name, setStatusName] = useState<string>(state.name);
  const [taskName, setTaskName] = useState<string>("");

  const [createMode, setCreateMode] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const [editTask, setEditTask] = useState<boolean>(false);

  const TasksId = useMemo(
    () => ownTasks.map((task) => task.id) || [],
    [ownTasks]
  );

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: state.id,
    data: {
      type: "Status",
      state,
    },
    disabled: editMode || editTask,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-columnBackgroundColor  w-[400px] h-[600px] max-h-[600px]  rounded-md flex flex-col items-start opacity-30 border-2 border-puplr-400"
      ></div>
    );
  }
  return (
    <>
      {errorMsg && (
        <PopUp
          type={PopUpType.Failed}
          message={errorMsg}
          setSuccess={() => setErrorMsg("")}
        />
      )}
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-columnBackgroundColor w-[400px] h-[600px] max-h-[600px] rounded-md flex flex-col items-start"
      >
        {/* Column title */}
        <div
          className="bg-mainBackGroundColor text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-mainBackGroundColor border-4 w-full flex items-center justify-between"
          onClick={() => {
            if (state.projectId) setEditMode(true);
          }}
        >
          <div className="flex gap-3">
            <div className="flex justify-center items-center bg-columnBackgroundColor px-2 py-1 text-sm rounded-full">
              {ownTasks?.length}
            </div>
            {!editMode ? (
              state.name
            ) : (
              <input
                className="bg-mainBackGroundColor text-black focus:border-purple-300 border-rounded outline-none px-2"
                type="text"
                placeholder="Enter a new column title"
                value={name}
                onChange={(e) => {
                  setStatusName(e.target.value);
                }}
                autoFocus
                onBlur={() => setEditMode(false)}
                onKeyDown={(e) => {
                  if (e.key !== "Enter") return;
                  updateStatus &&
                    updateStatus(state.id, name, status, updateS, setErrorMsg);
                  setEditMode(false);
                }}
              />
            )}
          </div>
          {state.projectId && (
            <button
              className="stroke-slate-500 hover:stroke-black hover:bg-columnBackgroundColor rounded p-2"
              onClick={() => {
                deleteStatus &&
                  deleteStatus(state.id, status, deleteS, setErrorMsg);
              }}
            >
              <TrashIcon />
            </button>
          )}
        </div>

        {/* Column task container */}
        <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto w-full task">
          <SortableContext items={TasksId}>
            {ownTasks?.map((task) => (
              <TaskContainer
                key={task.id}
                setErrorMsg={setErrorMsg}
                task={task}
                deleteTask={deleteTask}
                tasks={tasks}
                updateTask={updateTask}
                setEditTask={setEditTask}
              />
            ))}
          </SortableContext>
        </div>

        {/* Column footer */}
        {!createMode ? (
          <button
            className="flex gap-2 items-center border-mainBackGroundColor border-2 rounded-md p-4 hover:bg-columnBackgroundColor hover:text-purple-500 active:bg-mainBackGroundColor w-full"
            onClick={() => {
              setCreateMode(true);
            }}
          >
            <PlusIcon />
            Add a task
          </button>
        ) : (
          <form
            className="flex gap-2 items-center border-mainBackGroundColor border-2 rounded-md p-4 hover:bg-columnBackgroundColor hover:text-purple-500 active:bg-mainBackGroundColor w-full"
            onSubmit={(e) => {
              e.preventDefault();
              if (taskName.trim()) {
                createTask(taskName, state.id, tasks, createT, setErrorMsg);
              }
              setCreateMode(false);
              setTaskName("");
            }}
          >
            <input
              className="rounded-md appearance-none   relative block w-full px-3 h-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
              type="text"
              placeholder="Enter a new task"
              autoFocus
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              onBlur={() => {
                setCreateMode(false);
                setTaskName("");
              }}
            />
          </form>
        )}
      </div>
    </>
  );
};

export default ColumnContainer;
