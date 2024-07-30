import { ThemeProvider } from "@mui/material";
import { purple } from "@mui/material/colors";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { createTheme } from "@mui/material/styles";
import { useState } from "react";
import { UseFormRegister } from "react-hook-form";

interface SelectModelControl {
  labelText: string;
  labelFor: string;
  name: string;
  error?: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  options: { label: string; value: string | number }[];
  value?: string | number;
  [x: string]: unknown;
}

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500], // Change primary color to purple
    },
  },
  components: {
    MuiSelect: {
      styleOverrides: {
        select: {
          backgroundColor: "white",
          color: "slategray",
        },
        icon: {
          color: "white",
        },
        outlined: {
          borderColor: "white",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "black",
          fontSize: "14px",
          fontWeight: "300",
        },
      },
    },
  },
});

export default function SelectUniqueModal({
  labelText,
  name,
  labelFor,
  error,
  options,
  value = "", // Provide a default value for the 'value' prop
  register,
}: SelectModelControl) {
  const [items, setItems] = useState<number>(+value);

  const handleChange = (event: SelectChangeEvent<typeof items>) => {
    setItems(event.target.value as number);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="my-2">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" htmlFor={labelFor}>
            {labelText}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id={labelFor}
            value={items}
            label={labelText}
            {...register(name)}
            onChange={handleChange}
          >
            {options.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {error && (
            <span className="text-red-500 text-sm italic">{error}</span>
          )}
        </FormControl>
      </div>
    </ThemeProvider>
  );
}
