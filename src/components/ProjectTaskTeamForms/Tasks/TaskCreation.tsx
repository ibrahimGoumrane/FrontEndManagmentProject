import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { UnauthorizedError } from "../../../errors/http_errors";
import { Task, TaskCreationCredentials } from "../../../models/Tasks";
import { createTask } from "../../../network/TasksApi";
import Input from "../../LoginSignUp/utils/InputProject";
import { projectCreationFields } from "../Form/formFields";
import { validationSchemaTaskCreation } from "../Form/ValidationSchema";
interface TaskCreationProps {
  onCreatedSuccessfully: (task: Task) => void;
  onCancelCreation: () => void;
  projectId: number | string;
  statusId: number | string;
}

const fields = projectCreationFields;
export default function TaskCreationModal({
  onCreatedSuccessfully,
  onCancelCreation,
  projectId,
  statusId,
}: TaskCreationProps) {
  const [errorText, setErrorText] = useState<string | null>(null);
  const formOptions = {
    resolver: yupResolver(validationSchemaTaskCreation),
  };

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TaskCreationCredentials>(formOptions);
  async function onSubmit({ name }: TaskCreationCredentials) {
    try {
      const newProject = await createTask(name, projectId, statusId);
      onCreatedSuccessfully(newProject);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        setErrorText(error.message);
      } else {
        setErrorText("An error occurred");
      }
      console.error(error);
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center justify-start gap-10 h-full w-full"
    >
      <div className="w-[50%] px-10  ">
        <div>
          <h1 className="text-3xl font-serif text-nowrap font-bold text-center uppercase text-purple-900/90">
            Create a new Task
          </h1>
        </div>
        {errorText && (
          <div className="text-red-500 font-mono font-bold text-center uppercase">
            {errorText}
          </div>
        )}
        {fields.map((field, index) => (
          <Input
            key={index}
            labelText={field.labelText}
            labelFor={field.labelFor}
            register={register}
            placeholder={field.placeholder}
            name={field.name}
            error="Enter A valid title"
            type={field.type}
          />
        ))}
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="error"
            onClick={onCancelCreation}
            className="w-full"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "create Project" + "..." : "create Project"}
          </Button>
        </Stack>
      </div>
    </form>
  );
}
