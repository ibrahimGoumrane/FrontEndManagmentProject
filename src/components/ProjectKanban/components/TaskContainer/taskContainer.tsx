import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useRef, useState } from "react";
import { TaskContainerProps } from "../../propsInterfaces/interfaces.ts";
import TrashIcon from "../PlusIcon/Trash";
import "./taskContainer.css";
import TaskModifModel from "./Tasks/taskModif.tsx";
import { TaskProvider } from "../../../../utils/Contexte/TaskContext/TaskContexteprovider.tsx";
import { useProject } from "../../../../utils/Contexte/ProjectContext/projectContexte.ts";

const TaskContainer = ({
  task,
  deleteTask,
  tasks,
  setTasks,
  updateTask,
  createMode,
  setCreateMode,
  editMode,
  setEditMode,
  setUpdateMade,
}: TaskContainerProps) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [name, setName] = useState(task.name);
  const { project } = useProject();
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
    disabled: editMode || createMode,
  });
  useEffect(() => {
    if (createMode && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [createMode]);
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    if (isDragging) {
      setUpdateMade(true);
    }
  }, [isDragging, setUpdateMade]);
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className=" bg-mainBackGroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 opacity-30 cursor-grab w-full relative border-4 border-purple-600"
      />
    );
  }
  if (editMode) {
    return (
      <TaskProvider
        projectId={project?.id || ""}
        taskId={parseInt(task.id.toString().split("-")[1])}
        key={task.id}
      >
        <TaskModifModel setEditMode={setEditMode} />
      </TaskProvider>
    );
  }

  const removeCreateMode = () => {
    setCreateMode(false);
  };
  const EnterEditMode = () => {
    setEditMode(true);
  };
  if (createMode) {
    return (
      <div className="task bg-mainBackGroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-purple-500 cursor-grab w-full relative  ">
        <textarea
          name=""
          id=""
          ref={textareaRef}
          className="task h-[90%] w-full bg-transparent text-black border-none resize-none rounded "
          value={name}
          placeholder="Enter a new Title To your task (shift + enter to save the created task)"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              updateTask(
                task.id,
                {
                  name: name,
                },
                tasks,
                setTasks
              );
              setName("");
              setUpdateMade(true);
              removeCreateMode();
            }
          }}
          onChange={(e) => setName(e.target.value)}
        ></textarea>
      </div>
    );
  }

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
      {mouseIsOver && (
        <button
          className="stroke-black absolute right-8 top-1/2 -translate-y-1/2 p-2 rounded bg-columnBackgroundColor  opacity-60 hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            setUpdateMade(true);
            deleteTask(task.id, tasks, setTasks);
          }}
        >
          <TrashIcon />
        </button>
      )}
    </div>
  );
};

export default TaskContainer;
