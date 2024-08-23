import Backdrop from "@mui/material/Backdrop";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useCallback, useState } from "react";
import { Project } from "../../../models/Projects";
import { PopUpType } from "../../../models/utils";
import { useUser } from "../../../utils/Contexte/UserContext/userContexte";
import PopUp from "../../utils/popUp";
import ProjectCreationModal from "./ProjectCreation";
interface FormProps {
  showProjectCreation: boolean;
  setShowProjectCreation: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function ProjectCreationBase({
  showProjectCreation,
  setShowProjectCreation,
}: FormProps) {
  const { updateProjects, projects } = useUser();
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const TogglePojectCreation = useCallback(() => {
    setShowProjectCreation(!showProjectCreation);
  }, [setShowProjectCreation, showProjectCreation]);

  const onCreatedSuccessfully = (project: Project) => {
    if (projects) updateProjects([...projects, project]);
    else updateProjects([project]);
    setShow(true);
    TogglePojectCreation();
  };
  return (
    <Dialog
      open={showProjectCreation}
      onClose={() => setShowProjectCreation(false)}
      PaperProps={{
        component: "div",
      }}
      sx={{
        "&": {
          alignSelf: "start",
        },
        "& .MuiPaper-root": {
          display: "flex",
          flexDirection: "column",
          gap: "2px",
          justifyContent: "start",
        },
        "& .MuiTypography-root ": {
          fontWeight: "600",
          fontSize: "16px",
          color: "black",
          mb: "5px",
          fontFamily: "sans-serif",
        },
        "& .MuiFormLabel-root.MuiInputLabel-root , & .MuiInputBase-input.MuiInput-input":
          {
            color: "black",
            fontSize: "16px",
            fontFamily: "sans-serif",
          },
        "& .MuiDialogActions-root.MuiDialogActions-spacing": {
          gap: "5px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        },
      }}
      components={{
        Backdrop: (props) => (
          <Backdrop {...props} sx={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }} />
        ),
      }}
    >
      <DialogTitle>Create a Project </DialogTitle>
      <DialogContent>
        <DialogContentText>
          To create a Project, please fill out the form below.
        </DialogContentText>
        <ProjectCreationModal
          onCreatedSuccessfully={onCreatedSuccessfully}
          onCancelCreation={() => setShowProjectCreation(false)}
          setErrorText={setError}
        />
      </DialogContent>
      {show && (
        <PopUp
          type={PopUpType.Success}
          message={"Project Created Successfully"}
          setSuccess={setShowProjectCreation}
        />
      )}
      {error && (
        <PopUp
          type={PopUpType.Failed}
          message={error}
          setSuccess={() => setError("")}
        />
      )}
    </Dialog>
  );
}
