import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  ListItemText,
  OutlinedInput,
  ThemeProvider,
  Checkbox,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { UseFormRegister } from "react-hook-form";

interface SelectModelControl {
  labelText: string;
  labelFor: string;
  name: string;
  error?: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  options: { label: string; value: string  }[];
  [x: string]: unknown;
}

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500], // Change primary color to purple
    },
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function SelectModal({
  labelText,
  name,
  labelFor,
  error,
  options,
  register,
}: SelectModelControl) {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectedValues>) => {
    const {
      target: { value },
    } = event;

    setSelectedValues(
      typeof value === "string" ? value.split(",") : value
    );    
    const labels = options.filter(option => value.includes(option.value)).map(option => option.label);
    setSelectedLabels(labels);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <ThemeProvider theme={theme}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" htmlFor={labelFor}>
            {labelText}
          </InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id={labelFor}
            multiple
            value={selectedValues}
            label={labelText}
            {...register(name)}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={() => selectedLabels.join(", ")}
            MenuProps={MenuProps}
          >
            {options.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                <Checkbox checked={selectedValues.indexOf(option.value) > -1} />
                <ListItemText primary={option.label} />
              </MenuItem>
            ))}
          </Select>
          {error && (
            <span className="text-red-500 text-sm italic">{error}</span>
          )}
        </FormControl>
      </ThemeProvider>
    </Box>
  );
}
