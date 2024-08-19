import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { useEffect, useMemo, useState } from "react";
import { TaskStatus } from "../../models/Status";
import { Task } from "../../models/Tasks";
import ColumnContainer from "./components/ColumnContainer/ColumnContainer";
import TaskCard from "./components/TaskContainer/taskContainer";
import {
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
  taskStatus: TaskStatus[];
  projectTasks: Task[];
  createStatus: (newTaskStatus: TaskStatus) => void;
}

const KanbanBoard = ({ taskStatus, projectTasks }: KanbanBoardProps) => {
  const [status, setStatus] = useState<TaskStatus[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  // Update the tasks when the projectTasks changes
  useEffect(() => {
    setTasks(
      projectTasks.map((task) => ({
        ...task,
        id: `task-${task.id}`,
      }))
    );
  }, [projectTasks]);
  // Update the status when the taskStatus changes
  useEffect(() => {
    setStatus(taskStatus);
  }, [taskStatus]);

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
                  tasks={tasks}
                  ownTasks={tasks.filter((task) => task.statusId === stat.id)}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
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
                tasks={tasks}
                ownTasks={tasks.filter(
                  (task) => task.statusId === activeStatus.id
                )}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
            {activeTask && (
              <TaskCard
                key={activeTask.id}
                task={activeTask}
                deleteTask={deleteTask}
                tasks={tasks}
                updateTask={updateTask}
                editMode={false}
                setEditMode={() => {}}
              />
            )}
          </DragOverlay>
        </DndContext>
      </div>
    </main>
  );
};

export default KanbanBoard;
