import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UnauthorizedError } from "../../../errors/http_errors";
import { validationSchemaTaskModification } from "../Form/ValidationSchema";
import {
  getTaskModificationFields,
  TaskModificationField,
} from "../Form/formFields";
import { TaskModification, Task } from "../../../models/Tasks";
import SelectUnique from "../../LoginSignUp/utils/SelectUnique";
import { Button, Stack } from "@mui/material";
import Input from "../../LoginSignUp/utils/Input";
import CircularIndeterminate from "../../LoginSignUp/utils/spinner";

interface TaskModifProps {
  onSubmitSuccessfull: (task: TaskModification) => void;
  onTaskModifError: (error: UnauthorizedError) => void;
  projectId: number | string;
  onCancelCreation: () => void;
  task: Task | null;
}

export default function TaskModif({
  onSubmitSuccessfull,
  onTaskModifError,
  onCancelCreation,
  projectId,
  task,
}: TaskModifProps) {
  const [errorText, setErrorText] = useState<string | null>(null);
  const [fields, setFields] = useState<TaskModificationField[]>([]);
  const [editedSuccessfully, setEditedSuccessfully] = useState(false);

  const formOptions = {
    resolver: yupResolver(validationSchemaTaskModification),
  };

  useEffect(() => {
    async function fetchFields() {
      const fields = await getTaskModificationFields(projectId);
      setFields(fields);
    }
    fetchFields();
  }, [projectId]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TaskModification>(formOptions);

  async function onSubmit(credentials: TaskModification) {
    try {
      onSubmitSuccessfull(credentials);
      setEditedSuccessfully(true);
      setErrorText("");
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        onTaskModifError(error);
        setErrorText(error.message);
      } else {
        setErrorText("An error occurred");
      }
      console.error(error);
    }
  }
  function getErrorMessage(
    fieldName: keyof TaskModification
  ): string | undefined {
    return errors[fieldName]?.message;
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
    >
      <div className="flex flex-col w-full h-full ">
        {errorText && <div className="text-red-500">{errorText}</div>}
        {editedSuccessfully && (
          <div className="text-green-500">Task Updated Successfully</div>
        )}
        {fields.map((field) =>
          field.type === "select" ? (
            <SelectUnique
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
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="error"
            onClick={onCancelCreation}
            className="w-full text-nowrap"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            type="submit"
            disabled={isSubmitting}
            className="w-full text-nowrap "
          >
            {isSubmitting ? "Updating Task..." : "Update Task"}
          </Button>
        </Stack>
      </div>
    </form>
  );
}
