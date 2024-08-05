import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UnauthorizedError } from "../../../../errors/http_errors";
import { ProjectModif } from "../../../../models/Projects";
import { PopUpType } from "../../../../models/utils.ts";
import { useProject } from "../../../../utils/Contexte/ProjectContext/projectContexte";
import CircularIndeterminate from "../../../utils/spinner";
import {
  getProjectModificationFields,
  ProjectModificationField,
} from "../../../ProjectTaskTeamForms/Form/formFields";
import { validationSchemaProjectModification } from "../../../ProjectTaskTeamForms/Form/ValidationSchema";
import Input from "../InputProject";
import PopUp from "../../../utils/popUp";

interface ProjectModifProps {
  onUpdatedSuccessfully: (newProject: ProjectModif | null) => void;
  onCancelModif: () => void;
}

export default function ProjectModifComponent({
  onUpdatedSuccessfully,
  onCancelModif,
}: ProjectModifProps) {
  const { project } = useProject();

  const [fields, setFields] = useState<ProjectModificationField[]>([]);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const formOptions = {
    resolver: yupResolver(validationSchemaProjectModification),
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProjectModif>(formOptions);

  useEffect(() => {
    async function getFields() {
      const fields = await getProjectModificationFields();
      setFields(fields);
    }
    getFields();
  }, []);

  async function onSubmit(credentials: ProjectModif) {
    try {
      onUpdatedSuccessfully(credentials);
      setSuccess(true);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        setErrorText(error.message);
      } else {
        setErrorText("An error occurred");
      }
      console.error(error);
    }
  }

  function getErrorMessage(fieldName: keyof ProjectModif): string | undefined {
    return errors[fieldName]?.message;
  }

  if (!fields || fields.length === 0) {
    return (
      <div className="pt-6">
        <CircularIndeterminate />
      </div>
    );
  }

  return (
    <div className="font-bold w-full min-h-[67vh] flex flex-col justify-between">
      {success && (
        <PopUp
          type={PopUpType.Success}
          message="Your Project has been updated successfully."
          setSuccess={setSuccess}
        />
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-20"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        id="projectModif"
      >
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
            error={getErrorMessage(field.name)}
            type={field.type}
            stylesLabel={
              "tracking-widest pb-2 block text-slate-900 text-md font-bold"
            }
            value={project?.[field.name]?.toString() ?? ""}
          />
        ))}
      </form>
      <div>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="error"
            onClick={onCancelModif}
            className="w-full h-12"
          >
            <span className="text-nowrap font-bold text-sm">Cancel</span>
          </Button>
          <Button
            variant="contained"
            color="success"
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 text-nowrap"
            form="projectModif"
          >
            <span className="text-nowrap font-bold text-sm">
              {isSubmitting ? "Apply..." : "Apply"}
            </span>
          </Button>
        </Stack>
      </div>
    </div>
  );
}
