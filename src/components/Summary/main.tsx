import { useEffect } from "react";
import { Project } from "../../models/Projects";
import { ProjectStatus, TaskStatus } from "../../models/Status";
import { Task } from "../../models/Tasks";
import { User } from "../../models/Users";

interface summaryProps {
  project: Project | null;
  tasks: Task[];
  projectStatus: ProjectStatus[] | null;
  projectState: ProjectStatus | null;
  members: User[];
  taskStatus: TaskStatus[];
}

const Summary = ({
  project,
  tasks,
  projectStatus,
  projectState,
  members,
  taskStatus,
}: summaryProps) => {
  useEffect(() => {});
  return (
    <div>
      <h1>Summary</h1>
    </div>
  );
};
export default Summary;
