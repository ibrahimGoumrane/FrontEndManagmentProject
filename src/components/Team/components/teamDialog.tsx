import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Backdrop from "@mui/material/Backdrop";
import { createTeam } from "../../../network/TeamApi";
import PopUp from "../../utils/popUp";
import { PopUpType } from "../../../models/utils";
import { useUser } from "../../../utils/Contexte/UserContext/userContexte";
interface FormProps {
  open: boolean;
  setCreateTeam: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function FormDialog({ open, setCreateTeam }: FormProps) {
  const [show, setShow] = useState(false);
  const { teams, updateTeams } = useUser();
  return (
    <Dialog
      open={open}
      onClose={() => setCreateTeam(false)}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          async function saveTeam() {
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const name = formJson.name;
            const newTeam = await createTeam(name.toString());
            if (newTeam) {
              //updateUserTeams
              const newTeams = teams ? [...teams, newTeam] : [newTeam];
              updateTeams(newTeams);

              setShow(true);
            } else {
              console.error("Error creating team");
            }
          }
          saveTeam();
        },
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
      <DialogTitle>Create a Team </DialogTitle>
      <DialogContent>
        <DialogContentText>
          To create a team, please fill out the form below.
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          label="Team Name"
          type="name"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setCreateTeam(false)}
          sx={{
            "&": {
              flexGrow: 1,
              flexShrink: 1,
              backgroundColor: "#ef4444",
              color: "white",
            },
            "&:hover": {
              backgroundColor: "#fca5a5",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          sx={{
            "&": {
              flexGrow: 1,
              flexShrink: 1,
              backgroundColor: "#4ade80",
              color: "white",
            },
            "&:hover": {
              backgroundColor: "#6ee7a7",
            },
          }}
        >
          Create
        </Button>
      </DialogActions>
      {show ? (
        <PopUp
          type={PopUpType.Success}
          message={"team Created Successfully"}
          setSuccess={setCreateTeam}
        />
      ) : (
        ""
      )}
    </Dialog>
  );
}
