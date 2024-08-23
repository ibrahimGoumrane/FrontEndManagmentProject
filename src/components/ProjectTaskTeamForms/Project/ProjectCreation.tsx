import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useForm } from "react-hook-form";
import { Project, ProjectCreation } from "../../../models/Projects";
import { createProject } from "../../../network/ProjectApi";
import Input from "../../utils/Input";
import TextArea from "../../utils/textarea";
import { projectCreationFields } from "../Form/formFields";
import { validationSchemaProjectCreation } from "../Form/ValidationSchema";

interface ProjectCreationProps {
  onCreatedSuccessfully: (project: Project) => void;
  onCancelCreation: () => void;
  setErrorText: React.Dispatch<React.SetStateAction<string>>;
}

const fields = projectCreationFields;
export default function ProjectCreationModal({
  onCreatedSuccessfully,
  onCancelCreation,
  setErrorText,
}: ProjectCreationProps) {
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
      setErrorText((error as Error).message);
      console.error(error);
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
      <Stack direction="row" spacing={2} display={"flex"} width={"100%"}>
        <Button
          variant="contained"
          color="error"
          onClick={onCancelCreation}
          className="w-full flex-1 text-nowrap"
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="success"
          type="submit"
          disabled={isSubmitting}
          className="w-full flex-1 text-nowrap "
        >
          {isSubmitting ? "create Project" + "..." : "create Project"}
        </Button>
      </Stack>
    </form>
  );
}
