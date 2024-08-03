import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { Stack } from "@mui/material";
import { Button as FbButton } from "flowbite-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TaskStatus } from "../../models/Status";
import { Id, Task } from "../../models/Tasks";
import ColumnContainer from "./components/ColumnContainer/ColumnContainer";
import PlusIcon from "./components/PlusIcon/icons";
import TaskCard from "./components/TaskContainer/taskContainer";
import {
  createNewStatus,
  createTask,
  deleteStatus,
  deleteTask,
  updateStatus,
  updateTask,
} from "./utility/CrudOperations";
import {
  onDragEnd,
  onDragOver,
  onDragStart,
} from "./utility/draggingFunctions";

interface KanbanBoardProps {
  projectId: Id;
  taskStatus: TaskStatus[];
  projectTasks: Task[];
  updateTasks: (tasks: Task[]) => void;
  updateTaskStatus: (taskStatus: TaskStatus[]) => void;
}

const KanbanBoard = ({
  projectId,
  taskStatus,
  projectTasks,
  updateTasks,
  updateTaskStatus,
}: KanbanBoardProps) => {
  const [status, setStatus] = useState<TaskStatus[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [updateMade, setUpdateMade] = useState<boolean>(false);

  useEffect(() => {
    setStatus(taskStatus);
    setTasks(
      projectTasks.map((task) => ({
        ...task,
        id: `task-${task.id}`,
      }))
    );
  }, [taskStatus, projectTasks]);
  // Function used to save changes to the database
  const saveProjectChanges = useCallback(async () => {
    setUpdateMade(false);
    const updatedTasks = tasks.map((task) => ({
      ...task,
      id: parseInt(task.id.toString().split("-")[1]),
    }));
    updateTasks(updatedTasks);
    updateTaskStatus(status);
  }, [tasks, status, updateTasks, updateTaskStatus]);

  const indueChanges = useCallback(() => {
    setUpdateMade(false);
    setStatus(taskStatus);
    setTasks(
      projectTasks.map((task) => ({
        ...task,
        id: `task-${task.id}`,
      }))
    );
  }, [taskStatus, projectTasks]);

  // States related to the behavior of the actual component (not stored in db)
  const statusId = useMemo(() => status.map((stat) => stat.id), [status]);
  const [activeStatus, setActiveStatus] = useState<TaskStatus | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, // Distance at which we should hover to start the event
      },
    })
  );

  return (
    <main className=" flex items-start flex-col gap-5 justify-between  kanbanBoard ">
      <div className="max-w-[100%] flex items-start justify-start overflow-x-auto  overflow-y-hidden kanbanBoard pb-2">
        <DndContext
          sensors={sensors}
          onDragStart={(event) =>
            onDragStart(event, setActiveStatus, setActiveTask)
          }
          onDragEnd={(event) =>
            onDragEnd(event, setStatus, setActiveTask, setActiveStatus)
          }
          onDragOver={(event) => onDragOver(event, setTasks)}
        >
          <div className="flex gap-4">
            <SortableContext items={statusId}>
              {status.map((stat) => (
                <ColumnContainer
                  key={stat.id}
                  state={stat}
                  deleteStatus={deleteStatus}
                  updateStatus={updateStatus}
                  createTask={createTask}
                  status={status}
                  setStatus={setStatus}
                  tasks={tasks}
                  ownTasks={tasks.filter((task) => task.statusId === stat.id)}
                  setTasks={setTasks}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  setUpdateMade={setUpdateMade}
                />
              ))}
            </SortableContext>
          </div>
          <DragOverlay>
            {activeStatus && (
              <ColumnContainer
                key={activeStatus.id}
                state={activeStatus}
                deleteStatus={deleteStatus}
                updateStatus={updateStatus}
                createTask={createTask}
                status={status}
                setStatus={setStatus}
                tasks={tasks}
                ownTasks={tasks.filter(
                  (task) => task.statusId === activeStatus.id
                )}
                setTasks={setTasks}
                deleteTask={deleteTask}
                updateTask={updateTask}
                setUpdateMade={setUpdateMade}
              />
            )}
            {activeTask && (
              <TaskCard
                key={activeTask.id}
                task={activeTask}
                deleteTask={deleteTask}
                tasks={tasks}
                setTasks={setTasks}
                updateTask={updateTask}
                createMode={false}
                setCreateMode={() => {}}
                editMode={false}
                setEditMode={() => {}}
                setUpdateMade={setUpdateMade}
              />
            )}
          </DragOverlay>
        </DndContext>
      </div>
      <div className="flex items-center justify-between  w-full">
        <button
          onClick={() => {
            createNewStatus(status, setStatus, projectId);
            setUpdateMade(true);
          }}
          className="h-[60px] w-[120ox] min-w-[60px] cursor-pointer rounded-lg bg-mainBackGroundColor p-4 ring-rose-500 hover:ring-2 flex items-center justify-center gap-3 text-purple-600 ml-2"
        >
          Create Status <PlusIcon />
        </button>
        {updateMade && (
          <div>
            <Stack direction="row" spacing={5}>
              <FbButton
                onClick={indueChanges}
                className="py-2 text-red-100 px-3 bg-red-500 hover:bg-red-200 hover:text-red-500 text-nowrap"
              >
                Cancel
              </FbButton>
              <FbButton
                className="bg-white py-2 text-purple-500 px-3 hover:bg-purple-100 hover:text-purple-900 text-nowrap"
                onClick={saveProjectChanges}
              >
                Save Changes
              </FbButton>
            </Stack>
          </div>
        )}
      </div>
    </main>
  );
};

export default KanbanBoard;
