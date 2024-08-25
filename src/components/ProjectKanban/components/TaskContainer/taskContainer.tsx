import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { TaskContainerProps } from "../../propsInterfaces/interfaces.ts";
import TrashIcon from "../PlusIcon/Trash";
import "./taskContainer.css";
import TaskModifModel from "./Tasks/taskModif.tsx";
import { TaskProvider } from "../../../../utils/Contexte/TaskContext/TaskContexteprovider.tsx";
import { useProject } from "../../../../utils/Contexte/ProjectContext/projectContexte.ts";

const TaskContainer = ({
  task,
  deleteTask,
  setErrorMsg,
  setEditTask,
}: TaskContainerProps) => {
  const { deleteTask: deleteT, project } = useProject();
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editModeTask, setEditModeTask] = useState<boolean>(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editModeTask,
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
        className=" bg-mainBackGroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 opacity-30 cursor-grab w-full relative border-4 border-purple-600"
      />
    );
  }
  if (editModeTask) {
    return (
      <TaskProvider
        projectId={project?.id || ""}
        taskId={parseInt(task.id.toString().split("-")[1])}
        key={task.id}
      >
        <TaskModifModel setEditMode={setEditModeTask} />
      </TaskProvider>
    );
  }
  const EnterEditMode = () => {
    setEditTask && setEditTask(true);
    setEditModeTask(true);
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className=" bg-mainBackGroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-purple-500 cursor-grab w-full relative "
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      onClick={EnterEditMode}
    >
      <p className="task my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
        {task.name}
      </p>
      {mouseIsOver && setErrorMsg && (
        <button
          className="stroke-black absolute right-8 top-1/2 -translate-y-1/2 p-2 rounded bg-columnBackgroundColor  opacity-60 hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(task.id, deleteT, setErrorMsg);
          }}
        >
          <TrashIcon />
        </button>
      )}
    </div>
  );
};

export default TaskContainer;
