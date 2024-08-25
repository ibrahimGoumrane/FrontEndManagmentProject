import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { toDateTimeLocal } from "../../../../../utils/utility";

interface InputProps {
  labelText: string;
  labelFor: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error?: string | undefined;
  stylesLabel?: string;
  stylesInput?: string;
  value?: string | number;
  [x: string]: unknown;
}

const fixedInputClass =
  "italic lowercase font-bold pl-2 rounded-md appearance-none relative block w-full px-3 py-2 rounded h-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm";
const fixedLabelClass =
  "block text-gray-700 text-sm font-light font-semibold text-white";

function formatDateTime(initialValue: string | number) {
  if (typeof initialValue === "string" || typeof initialValue === "number") {
    const parsedDate = new Date(initialValue);
    if (!isNaN(parsedDate.getTime())) {
      return toDateTimeLocal(parsedDate.toISOString());
    }
  }
  return "";
}

export default function InputDate({
  labelText,
  name,
  labelFor,
  register,
  stylesInput,
  stylesLabel,
  error,
  value: initialValue = "",
}: InputProps) {
  const [item, setItem] = useState<string | number>(
    formatDateTime(initialValue)
  );
  const [Labelvalue, setLabelvalue] = useState<string | number>(item);
  const [updateValue, setUpdateValue] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setItem(newValue);
  };

  const handleOnBlur = () => {
    setLabelvalue(formatDateTime(item));
    setUpdateValue(false);
  };

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
        {...register(name, {
          onBlur: handleOnBlur,
          onChange: handleChange,
          value: item,
        })}
        type="datetime-local"
        className={`${stylesInput ? stylesInput : fixedInputClass} ${
          error ? "border-red-400" : ""
        } ${updateValue || !Labelvalue ? "" : "hidden"}`}
      />
      {error && <span className="text-red-500 text-xs italic">{error}</span>}
    </div>
  );
}
