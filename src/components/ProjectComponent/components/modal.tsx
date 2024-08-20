import { Modal as BaseModal } from "@mui/base/Modal";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { css, styled } from "@mui/system";
import * as React from "react";
import { PopUpType } from "../../../models/utils";
import { Backdrop } from "@mui/material";
interface ModalProps {
  mainData: string;
  secondData: string;
  onApproval: () => void;
  onDisapproval: () => void;
  type: PopUpType;
}
const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function ModalUnstyled({
  mainData,
  secondData,
  onApproval,
  onDisapproval,
  type,
}: ModalProps) {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);
  let colors = "";
  switch (type) {
    case PopUpType.Success:
      colors = "text-green-500/90";
      break;
    case PopUpType.Failed:
      colors = "text-red-500/90";
      break;
    default:
      colors = "text-purple-500/90";
  }
  return (
    <div>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        slots={{ backdrop: Backdrop }}
        onClose={handleClose}
      >
        <ModalContent sx={style}>
          <h2
            id="unstyled-modal-title"
            className={"text-3xl font-bold capitalize font-mono " + colors}
          >
            {mainData}
          </h2>
          <p
            id="unstyled-modal-description"
            className="font-medium text-sm italic font-sans    mb-2 "
          >
            {secondData}
          </p>
          <div className="flex items-center justify-between flex-col w-full gap-3">
            <Stack direction="row" spacing={2} width={"100%"}>
              <Button
                variant="contained"
                color="error"
                onClick={onDisapproval}
                className="w-full h-12 flex-1"
              >
                <span className="text-nowrap font-bold text-sm">Cancel</span>
              </Button>
              <Button
                variant="contained"
                color="success"
                type="submit"
                className="w-full h-12 text-nowrap flex-1"
                onClick={onApproval}
              >
                <span className="text-nowrap font-bold text-sm">Apply</span>
              </Button>
            </Stack>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 24px;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `
);
