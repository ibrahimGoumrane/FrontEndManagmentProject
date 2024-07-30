import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import { TaskProvider } from "../../../../utils/Contexte/TaskContext/TaskContexteprovider.tsx";
import { ColumnContainerProps } from "../../propsInterfaces/interfaces.ts";
import TrashIcon from "../PlusIcon/Trash";
import PlusIcon from "../PlusIcon/icons";
import TaskContainer from "../TaskContainer/taskContainer";

const ColumnContainer = ({
  state,
  deleteStatus,
  updateStatus,
  status,
  createTask,
  setStatus,
  tasks,
  ownTasks,
  setTasks,
  deleteTask,
  updateTask,
  setUpdateMade,
  ProjectId,
}: ColumnContainerProps) => {
  //Storable state of our component
  const [name, setProjectName] = useState<string>(state.name);

  //used to manipulate behavior of our componenent
  const [createMode, setCreateMode] = useState<boolean>(false);
  const [editMode, setEditMode] = useState(false);
  const [editModeTask, setEditModeTask] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

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
    disabled: editMode || editModeTask,
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
        className="bg-columnBackgroundColor w-[350px] h-[500px] max-h-[500x] rounded-md flex flex-col items-start opacity-30 border-2 border-puplr-400 "
      ></div>
    );
  }

  return (
    <>
      {errorMsg && (
        <div className="bg-red-500 text-white p-2 rounded-md">{errorMsg}</div>
      )}
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-columnBackgroundColor w-[350px] h-[500px] max-h-[500x] rounded-md flex flex-col items-start "
      >
        {/* Column title */}
        <div
          className="bg-mainBackGroundColor text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-mainBackGroundColor border-4 w-full flex  items-center justify-between"
          onClick={() => {
            if (state.projectId) setEditMode(true);
          }}
        >
          <div className="flex gap-3">
            <div className="flex justify-center items-center bg-columnBackgroundColor px-2 py-1 text-sm rounded-full">
              {ownTasks?.length}
            </div>
            {!editMode && state.name}
            {editMode && (
              <input
                className="bg-mainBackGroundColor text-black focus:border-purple-300 border-rounded outline-none px-2"
                type="text"
                placeholder="Enter a new column title"
                value={name}
                onChange={(e) => {
                  setProjectName(e.target.value);
                }}
                autoFocus
                onBlur={() => setEditMode(false)}
                onKeyDown={(e) => {
                  if (e.key !== "Enter") return;
                  updateStatus &&
                    updateStatus(state.id, name, status, setStatus);
                  setEditMode(false);
                  setUpdateMade(true);
                }}
              />
            )}
          </div>
          {state.projectId && (
            <button
              className="stroke-slate-500 hover:stroke-black hover:bg-columnBackgroundColor  rounded p-2"
              onClick={() => {
                deleteStatus &&
                  deleteStatus(
                    state.id,
                    status,
                    setStatus,
                    setTasks,
                    setErrorMsg
                  );
                setUpdateMade(true);
              }}
            >
              <TrashIcon />
            </button>
          )}
        </div>

        {/* Column task container */}
        <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto w-full">
          <SortableContext items={TasksId}>
            {ownTasks?.map((task) => (
              <TaskProvider
                projectId={ProjectId || ""}
                taskId={parseInt(task.id.toString().split("-")[1])}
                key={task.id}
              >
                <TaskContainer
                  key={task.id}
                  task={task}
                  deleteTask={deleteTask}
                  tasks={tasks}
                  setTasks={setTasks}
                  updateTask={updateTask}
                  createMode={createMode}
                  setCreateMode={setCreateMode}
                  editMode={editModeTask}
                  setEditMode={setEditModeTask}
                  setUpdateMade={setUpdateMade}
                  ProjectId={ProjectId}
                />
              </TaskProvider>
            ))}
          </SortableContext>
        </div>
        {/* Column footer */}
        <button
          className={
            "flex gap-2 items-center border-mainBackGroundColor border-2 rounded-md p-4 hover:bg-columnBackgroundColor hover:text-purple-500 active:bg-mainBackGroundColor w-full " +
            `${createMode ? "hidden" : ""}`
          }
          onClick={() => {
            setCreateMode(true);
            createTask(state.id, tasks, setTasks);
          }}
          disabled={createMode}
        >
          <PlusIcon />
          New Task
        </button>
      </div>
    </>
  );
};
export default ColumnContainer;
