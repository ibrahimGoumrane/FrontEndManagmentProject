import { ProjectCreation, ProjectModif } from "../../../models/Projects";
import {
  Id,
  TaskModification,
  TaskCreationCredentials,
} from "../../../models/Tasks";
import { User } from "../../../models/Users";
import { getProjectStatus, getTaskStatus } from "../../../network/StatusApi";

interface Field<T> {
  labelText: string;
  labelFor: string;
  id: string;
  name: keyof T;
  type: string;
  isRequired: boolean;
  placeholder: string;
  options?: { label: string; value: Id }[];
}

type ProjectCreationField = Field<ProjectCreation>;
type TaskCreationField = Field<TaskCreationCredentials>;
export type ProjectModificationField = Field<ProjectModif>;
export type TaskModificationField = Field<TaskModification>;


const projectCreationFields: ProjectCreationField[] = [
  {
    labelText: "Project Name",
    labelFor: "projectName",
    id: "projectName",
    name: "name",
    type: "text",
    isRequired: true,
    placeholder: "Enter project name",
  },
  {
    labelText: "Description",
    labelFor: "description",
    id: "description",
    name: "description",
    type: "textarea",
    isRequired: true,
    placeholder: "Enter description",
  },
];

const taskCreationFields: TaskCreationField[] = [
  {
    labelText: "Task Name",
    labelFor: "taskName",
    id: "taskName",
    name: "name",
    type: "text",
    isRequired: true,
    placeholder: "Enter task name",
  },
];

async function getProjectModificationFields(): Promise<
  ProjectModificationField[]
> {
  const ProjectStatus = await getProjectStatus();
  const formattedStatus = ProjectStatus.map((status) => ({
    label: status.name,
    value: status.id,
  }));

  const projectModificationFields: ProjectModificationField[] = [
    {
      labelText: "Project Name",
      labelFor: "projectName",
      id: "projectName",
      name: "name",
      type: "text",
      isRequired: false,
      placeholder: "Enter project name",
    },
    {
      labelText: "Description",
      labelFor: "description",
      id: "description",
      name: "description",
      type: "textarea",
      isRequired: false,
      placeholder: "Enter description",
    },
    {
      labelText: "End Date",
      labelFor: "endDate",
      id: "endDate",
      name: "endDate",
      type: "datetime-local",
      isRequired: false,
      placeholder: "Enter end date",
    },
    {
      labelText: "Status",
      labelFor: "status",
      id: "status",
      name: "statusId",
      type: "select",
      isRequired: false,
      placeholder: "Change the status Of your project",
      options: formattedStatus,
    },
  ];
  return projectModificationFields;
}
async function getTaskModificationFields(
  id: number | string,
  members: User[]
): Promise<TaskModificationField[]> {
  const ProjectUsers = [
    ...members,
    {
      id: 0,
      name: "No Assignee",
    },
  ];
  const TaskStatus = await getTaskStatus(id);
  const formattedUsers = ProjectUsers.map((user) => ({
    label: user.name,
    value: user.id,
  }));

  const formattedStatus = TaskStatus.map((status) => ({
    label: status.name,
    value: status.id,
  }));
  const taskModificationFields: TaskModificationField[] = [
    {
      labelText: "Creator",
      labelFor: "creator",
      id: "creator",
      name: "creatorId",
      type: "select",
      isRequired: false,
      placeholder: "Enter Task Creator ",
      options: formattedUsers,
    },
    {
      labelText: "Task Name",
      labelFor: "taskName",
      id: "taskName",
      name: "name",
      type: "text",
      isRequired: false,
      placeholder: "Enter task name",
    },
    {
      labelText: "Assignee",
      labelFor: "assignee",
      id: "assignee",
      name: "AssigneeId",
      type: "select",
      isRequired: false,
      placeholder: "Select assignee",
      options: formattedUsers,
    },
    {
      labelText: "Task Status ",
      labelFor: "taskstatus",
      id: "taskstatus",
      name: "statusId",
      type: "select",
      isRequired: false,
      placeholder: "Select status",
      options: formattedStatus,
    },
    {
      labelText: "StoryPoint",
      labelFor: "stroypoint",
      id: "storypoint",
      name: "StoryPoint",
      type: "number",
      isRequired: false,
      placeholder: "Select StoryPoint",
    },
    {
      labelText: "EndDate",
      labelFor: "EndDate",
      id: "EndDate",
      name: "endDate",
      type: "datetime-local",
      isRequired: false,
      placeholder: "Select EndDate",
    },
  ];
  return taskModificationFields;
}
export {
  getProjectModificationFields,
  getTaskModificationFields,
  projectCreationFields,
  taskCreationFields,
};
