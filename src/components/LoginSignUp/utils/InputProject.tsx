/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { UseFormRegister } from "react-hook-form";
import { useTask } from "../../../utils/Contexte/TaskContext/taskContexte";
import { toDateTimeLocal } from "../../../utils/utility";

interface InputProps {
  labelText: string;
  labelFor: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string | undefined;
  stylesLabel?: string;
  stylesInput?: string;
  value?: string | number;
  type?: string; // Add this prop to specify the type of input
  [x: string]: unknown;
}

const fixedInputClass =
  "italic lowercase font-bold pl-2 rounded-md appearance-none relative block w-full px-3 py-2 rounded h-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm";
const fixedLabelClass =
  "block text-gray-700 text-sm font-light font-semibold text-white";

export default function Input({
  labelText,
  name,
  labelFor,
  register,
  stylesInput,
  stylesLabel,
  error,
  type = "text", // Default to text input
  value = "",
  ...props
}: InputProps) {
  const { task } = useTask();
  const valueState = useRef<string | number>(value);
  const [Labelvalue, setLabelvalue] = useState<string | number>(value);
  const [updateValue, setUpdateValue] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (type === "datetime-local") {
      if (task?.startDate) {
        const startDateValue = new Date(task?.startDate);
        const endDateValue = new Date(newValue);
        if (endDateValue < startDateValue) {
          event.target.value = toDateTimeLocal(task?.startDate);
          return;
        }
      }
    }
    valueState.current = newValue;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setLabelvalue(valueState.current);
      setUpdateValue(false);
    }
  };
  useEffect(() => {
    if (value) {
      setLabelvalue(value);
    }
  }, [value]);

  return (
    <div className="w-full h-16">
      <label
        htmlFor={labelFor}
        className={`${stylesLabel ? stylesLabel : fixedLabelClass} ${
          error ? "text-red-400 " : ""
        }`}
      >
        {labelText}
      </label>
      <div
        className={`text-black font-mono text-md relative flex items-start p-2 justify-start w-full bg-white rounded-md after:border after:border-white after:rounded-md after:hidden min-h-5 after:absolute after:content-['Edit'] after:top-0 after:left-0 after:w-full after:h-full after:hover:flex after:text-purple-200 after:items-center after:justify-center after:bg-black/40 after:transition-all after:duration-300 ${
          !Labelvalue || updateValue ? "hidden" : ""
        }`}
        onClick={() => {
          setUpdateValue(true);
        }}
      >
        <span className="italic lowercase font-bold text-purple-500 pl-2">
          {Labelvalue}
        </span>
      </div>
      <input
        id={labelFor}
        {...props}
        {...register(name)}
        type={type} // Apply the type prop to the input
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={
          updateValue || Labelvalue === "" ? valueState.current : Labelvalue
        } // Use value instead of defaultValue
        className={`${stylesInput ? stylesInput : fixedInputClass} ${
          error ? "border-red-400" : ""
        } ${updateValue || !Labelvalue ? "" : "hidden"}`}
      />
      {error && <span className="text-red-500 text-xs italic">{error}</span>}
    </div>
  );
}
