import { Button } from "@mui/material";

const ButtonMain = () => {
  return (
    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center flex items-center justify-center xl:block">
      <div className="py-6 px-3  sm:mt-0">
        <Button
          variant="contained"
          color="error"
          sx={{
            borderRadius: "20px",
            backgroundColor: "#f44336",
            padding: "15px",
            "&:hover": {
              backgroundColor: "#f44336",
            },
          }}
        >
          Delete account
        </Button>
      </div>
    </div>
  );
};

export default ButtonMain;
