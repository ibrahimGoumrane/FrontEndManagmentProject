import { Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TaskModification } from "../../../../../models/Tasks";
import { useProject } from "../../../../../utils/Contexte/ProjectContext/projectContexte";
import { useTask } from "../../../../../utils/Contexte/TaskContext/taskContexte";
import {
  getTaskModificationFields,
  TaskModificationField,
} from "../../../../ProjectTaskTeamForms/Form/formFields";
import SelectUnique from "../../../../utils/SelectUnique";
import CircularIndeterminate from "../../../../utils/spinner";
import Input from "../components/InputTask";

interface TaskModifProps {
  onSubmitSuccessfull: (task: TaskModification) => Promise<void>;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TaskModif({
  onSubmitSuccessfull,
  setEditMode,
}: TaskModifProps) {
  const { task: taskState } = useTask();
  const [task, setTask] = useState(taskState);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [fields, setFields] = useState<TaskModificationField[]>([]);
  const [isAuthorised, setIsAuthorised] = useState<boolean>(true);
  const { members } = useProject();

  useEffect(() => {
    async function checkAuto() {
      try {
        if (taskState) {
          await onSubmitSuccessfull(taskState as TaskModification);
          setIsAuthorised(true);
        } else {
          setIsAuthorised(false);
        }
      } catch (error) {
        console.error(error);
        setIsAuthorised(false);
      }
    }
    checkAuto();
  }, []);

  useEffect(() => {
    async function fetchFields() {
      const Foundedfields = await getTaskModificationFields(
        task?.projectId ?? "",
        members
      );
      const selectFields: TaskModificationField[] = [];
      const inputFields: TaskModificationField[] = [];
      Foundedfields.forEach((field) => {
        if (field.type === "select") {
          selectFields.push(field);
        } else {
          inputFields.push(field);
        }
      });
      setFields([...inputFields, ...selectFields]);
    }
    fetchFields();
  }, [members, task?.projectId]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TaskModification>();

  async function onSubmit(credentials: TaskModification) {
    try {
      const savedData: TaskModification = {};
      if (!credentials.StoryPoint) {
        savedData.StoryPoint = undefined;
      } else {
        savedData.StoryPoint = +credentials.StoryPoint;
      }
      if (credentials.AssigneeId == 0 || !credentials.AssigneeId) {
        savedData.AssigneeId = undefined;
      } else {
        savedData.AssigneeId = +credentials.AssigneeId;
      }
      if (credentials.creatorId == 0 || !credentials.creatorId) {
        savedData.creatorId = undefined;
      } else {
        savedData.creatorId = +credentials.creatorId ?? 0;
      }
      savedData.name = credentials.name;
      savedData.statusId = credentials.statusId && +credentials.statusId;
      savedData.endDate = credentials.endDate;

      onSubmitSuccessfull(savedData);
      setEditMode(false);
      setErrorText("");
    } catch (error) {
      setErrorText((error as Error).message);
      console.error(error);
    }
  }

  function getErrorMessage(
    fieldName: keyof TaskModification
  ): string | undefined {
    return errors[fieldName]?.message;
  }

  function onCancelCreation() {
    setTask(taskState);
    setEditMode(false);
  }

  if (fields.length === 0) {
    return (
      <div className="pt-6">
        <CircularIndeterminate />;
      </div>
    );
  }

  return (
    <form
      className="w-full h-full flex items-center justify-between text-left text-black "
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
    >
      <div className="flex flex-col w-full h-full ">
        {errorText && <div className="text-red-500">{errorText}</div>}
        <div className="grid space-y-5 mb-2">
          {fields.map((field, index) =>
            field.type === "select" ? (
              <SelectUnique
                key={index}
                labelText={field.labelText}
                labelFor={field.labelFor}
                name={field.name}
                register={register}
                options={field.options ? field.options : []}
                error={getErrorMessage(field.name as keyof TaskModification)}
                value={task?.[field.name]?.toString() ?? ""}
              />
            ) : (
              <Input
                key={index}
                labelText={field.labelText}
                labelFor={field.labelFor}
                register={register}
                placeholder={field.placeholder}
                name={field.name}
                type={field.type}
                error={getErrorMessage(field.name as keyof TaskModification)}
                value={task?.[field.name]?.toString() ?? ""}
              />
            )
          )}
        </div>

        <Stack direction="row" spacing={2} mt={"20px"}>
          <Button
            variant="contained"
            color="error"
            onClick={onCancelCreation}
            className="w-full text-nowrap"
          >
            Go Back
          </Button>
          {isAuthorised && (
            <Button
              variant="contained"
              color="success"
              type="submit"
              disabled={isSubmitting}
              className="w-full text-nowrap "
            >
              {isSubmitting ? "Updating Task..." : "Update"}
            </Button>
          )}
        </Stack>
      </div>
    </form>
  );
}
