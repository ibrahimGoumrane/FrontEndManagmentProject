import { AddAuthorisation } from "../../../models/auth";

interface Field<T> {
  labelText: string;
  labelFor: string;
  id: string;
  name: keyof T;
  type: string;
  isRequired: boolean;
  placeholder: string;
  options: { label: string; value: number }[];
}
type ProjectAuthorisationFields = Field<AddAuthorisation>;

export const Actions = [
  { label: "CREATE", value: 0 },
  { label: "DELETE", value: 1 },
  { label: "UPDATE", value: 2 },
];
export const ModuleType = [{ label: "TASKMANAGER", value: 0 }];

const ProjectAuthorisationFields: ProjectAuthorisationFields[] = [
  {
    labelText: "Module Type",
    labelFor: "moduleType",
    id: "moduleType",
    name: "moduleType",
    type: "select",
    options: ModuleType,
    isRequired: true,
    placeholder: "Enter Module Type",
  },
  {
    labelText: "Action",
    labelFor: "action",
    id: "action",
    name: "action",
    type: "select",
    options: Actions,
    isRequired: true,
    placeholder: "Enter Action",
  },
];

export default ProjectAuthorisationFields;
