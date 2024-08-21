import Backdrop from "@mui/material/Backdrop";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getSkills } from "../../../network/SkillsApi";
import SelectModel from "../../utils/Select";

interface Props {
  addSkills: boolean;
  skills: Array<string>;
  setaddSkills: React.Dispatch<React.SetStateAction<boolean>>;
  onAddedSuccessfully: () => void;
  updateSkills: (skills: string[]) => Promise<void>;
}
export default function AddSkills({
  addSkills,
  skills,
  setaddSkills,
  updateSkills,
  onAddedSuccessfully,
}: Props) {
  const onCloseModal = () => {
    setaddSkills(false);
  };
  const [availableSkills, setAvailableSkills] = useState<
    {
      label: string;
      value: string;
    }[]
  >([{ label: "", value: "" }]);

  useEffect(() => {
    async function fetchSkills() {
      const newSkills = await getSkills();
      //filter the new skills from the old ones
      const displayedSkills = newSkills.filter(
        (skill) => !skills.includes(skill.name)
      );
      const formattedSkills = displayedSkills.map((skill) => ({
        label: skill.name,
        value: `${skill.id}`,
      }));
      setAvailableSkills(formattedSkills);
    }
    fetchSkills();
  }, []);
  function registerSubmit(data: { skills?: Array<string> }) {
    if (!data.skills) {
      return onCloseModal();
    }
    updateSkills(data.skills);
    onAddedSuccessfully();
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ skills?: Array<string> }>();

  return (
    <Dialog
      open={addSkills}
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
      <DialogTitle>Add a new skill </DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add a new skill, please fill in the following fields
        </DialogContentText>
        <form onSubmit={handleSubmit(registerSubmit)}>
          <SelectModel
            labelText="add a new skill"
            labelFor="skills"
            name="skills"
            register={register}
            options={availableSkills ? availableSkills : []}
            error={errors.skills?.message}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center px-3 py-2 bg-purple-500 text-white font-bold text-sm rounded-md hover:bg-purple-600 min-w-20 mt-5"
          >
            {isSubmitting ? "Adding..." : "Add"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
