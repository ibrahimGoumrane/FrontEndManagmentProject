import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { UnauthorizedError } from "../../../errors/http_errors";

import ProjectAuthorisationFields from "./formFields";
import { Actions, ModuleType } from "./formFields";
import { AddAuthorisation, AuthoString } from "../../../models/auth";
import SelectUnique from "../../utils/SelectUnique.tsx";

interface ProjectAuthProps {
  onCreatedSuccessfully: (newAuth: AuthoString) => void;
  onCancelCreation: () => void;
}

const fields = ProjectAuthorisationFields;
export default function ProjectAuthCreation({
  onCreatedSuccessfully,
  onCancelCreation,
}: ProjectAuthProps) {
  const [errorText, setErrorText] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddAuthorisation>();
  async function onSubmit(credentials: AddAuthorisation) {
    try {
      const returnedData: AuthoString = {
        moduleType: ModuleType[credentials.moduleType].label,
        action: Actions[credentials.action].label,
      };
      onCreatedSuccessfully(returnedData);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        setErrorText(error.message);
      } else {
        setErrorText("An error occurred");
      }
      console.error(error);
    }
  }
  function getErrorMessage(
    fieldName: keyof AddAuthorisation
  ): string | undefined {
    return errors[fieldName]?.message;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
      <div className=" px-10 flex flex-col gap-5">
        {errorText && (
          <div className="text-red-500 font-mono font-bold text-center uppercase">
            {errorText}
          </div>
        )}
        {fields.map((field, index) => (
          <SelectUnique
            key={index}
            labelText={field.labelText}
            labelFor={field.labelFor}
            name={field.name}
            register={register}
            options={field.options ? field.options : []}
            error={getErrorMessage(field.name)}
            value={field.options[0].value}
            stylesLabel={
              "tracking-widest pb-2 block text-slate-900 text-md font-bold"
            }
          />
        ))}
        <Stack direction="row" spacing={5}>
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
            {isSubmitting ? "Add" + "..." : "Add"}
          </Button>
        </Stack>
      </div>
    </form>
  );
}
