import { useEffect } from "react";
import { Project } from "../../../models/Projects";

interface updateProjectProps {
  onUpdatedSuccess: (newProject: Project | null) => void;
  onDismiss: () => void;
}

const UpdateProject = ({ onUpdatedSuccess, onDismiss }: updateProjectProps) => {
  useEffect(() => {

  }, []);
  return (
    <div>
      <h1>Update Project</h1>
    </div>
  );
};

export default UpdateProject;
