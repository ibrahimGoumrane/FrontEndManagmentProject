import Backdrop from "@mui/material/Backdrop";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ProjectAuthCreation from "./form/FormData.tsx";
import { AuthoString } from "../../models/auth.ts";
interface Props {
  modalUpdate: boolean;
  moduleId: string;
  memeberId: string;
  setModalUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  onCreatedSuccessfully: (
    moduleId: string,
    memeberId: string,
    moduleType: string,
    action: string
  ) => void;
}
export default function ModalUpdate({
  modalUpdate,
  moduleId,
  memeberId,
  setModalUpdate,
  onCreatedSuccessfully,
}: Props) {
  const onCloseModal = () => {
    setModalUpdate(false);
  };
  function handleSubmit(newAuth: AuthoString) {
    onCreatedSuccessfully(
      moduleId,
      memeberId,
      newAuth.moduleType,
      newAuth.action
    );
  }
  return (
    <Dialog
      open={modalUpdate}
      onClose={onCloseModal}
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
      <DialogTitle>Create a new Auth </DialogTitle>
      <DialogContent>
        <DialogContentText>
          To create a new Auth, please fill out the form below.
        </DialogContentText>
        <ProjectAuthCreation
          onCreatedSuccessfully={handleSubmit}
          onCancelCreation={onCloseModal}
        />
      </DialogContent>
    </Dialog>
  );
}
