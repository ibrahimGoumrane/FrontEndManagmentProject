import { useState } from "react";
import { Label, TextInput } from "flowbite-react";

interface inputProps {
  id: string;
  type: string;
  placeholder: string;
  required?: boolean;
  LabelText: string;
  helperText?: React.ReactNode;
  color?: string;
}

const InputComponent = ({
  id,
  type,
  placeholder,
  required,
  LabelText,
  helperText,
  color,
}: inputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  return (
    <div className="max-w-md">
      <div className="mb-2 block">
        <Label htmlFor={id} value={LabelText} />
      </div>
      <TextInput
        id={id}
        type={type}
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        {...(required ? { required } : null)}
        helperText={helperText}
        color={color ? color : "purple"}
      />
    </div>
  );
};

export default InputComponent;
