import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { UnauthorizedError } from "../../../errors/http_errors";
import { Project, ProjectCreation } from "../../../models/Projects";
import { createProject } from "../../../network/ProjectApi";
import Input from "../../LoginSignUp/utils/Input";
import TextArea from "../../LoginSignUp/utils/textarea";
import { projectCreationFields } from "../Form/formFields";
import { validationSchemaProjectCreation } from "../Form/ValidationSchema";

interface ProjectCreationProps {
  onCreatedSuccessfully: (project: Project) => void;
  onCancelCreation: () => void;
}

const fields = projectCreationFields;
export default function ProjectCreationModal({
  onCreatedSuccessfully,
  onCancelCreation,
}: ProjectCreationProps) {
  const [errorText, setErrorText] = useState<string | null>(null);
  const formOptions = {
    resolver: yupResolver(validationSchemaProjectCreation),
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProjectCreation>(formOptions);
  async function onSubmit(credentials: ProjectCreation) {
    try {
      const newProject = await createProject(credentials);
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
      className="flex items-center justify-start gap-10 h-full w-full "
    >
      <div className="flex items-start justify-start h-full w-1/2">
        <img
          src="/img/project.jpg"
          alt="Project img"
          className="w-full h-full rounded-md"
        />
      </div>
      <div className="w-[50%] px-10  ">
        <div>
          <h1 className="text-3xl font-serif text-nowrap font-bold text-center uppercase text-purple-900/90 mb-5">
            Create a new Project
          </h1>
        </div>
        {errorText && (
          <div className="text-red-500 font-mono font-bold text-center uppercase">
            {errorText}
          </div>
        )}
        {fields.map((field, index) =>
          field.type === "textarea" ? (
            <TextArea
              key={index}
              labelText={field.labelText}
              labelFor={field.labelFor}
              register={register}
              placeholder={field.placeholder}
              name={field.name}
              error={errors[field.name]?.message} // Pass error message from validationSchemaSignUp
              type={field.type}
            />
          ) : (
            <Input
              key={index}
              labelText={field.labelText}
              labelFor={field.labelFor}
              register={register}
              placeholder={field.placeholder}
              name={field.name}
              error={errors[field.name]?.message} // Pass error message from validationSchemaSignUp
              type={field.type}
              stylesLabel={
                "block text-gray-700 text-sm font-light font-semibold  text-black"
              }
            />
          )
        )}
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
