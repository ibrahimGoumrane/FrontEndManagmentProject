import { useEffect, useState } from "react";
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
  stylesLabel?: string;
  stylesInput?: string;
  [x: string]: unknown;
}

const fixedInputClass =
  "italic lowercase font-bold pl-2 rounded-md appearance-none relative block w-full px-3 py-2 rounded h-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm";
const fixedLabelClass =
  "block text-gray-700 text-sm font-light font-semibold  text-white";

export default function SelectUniqueModal({
  labelText,
  name,
  labelFor,
  error,
  options,
  stylesInput,
  stylesLabel,
  value = "0", // Provide a default value for the 'value' prop
  register,
}: SelectModelControl) {
  const [item, setItem] = useState<number>(+value);
  const [Labelvalue, setLabelvalue] = useState<string>("");
  useEffect(() => {
    const selectedValue = options.find(
      (option) => +option.value === +item
    )?.label;
    setLabelvalue(selectedValue || "");
  }, [item, options]);
  const [updateValue, setUpdateValue] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItem(+event.target.value);
    setUpdateValue(false);
  };
  return (
    <div>
      <label
        className={` ${stylesLabel ? stylesLabel : fixedLabelClass}  ${
          error ? "text-red-400" : ""
        }`}
      >
        {labelText}
      </label>
      <div
        className={`text-black font-mono border-black border-2 text-md relative flex items-start p-2 justify-start w-full bg-white rounded-md after:border after:border-white after:rounded-md after:hidden min-h-5 after:absolute after:content-['Edit'] after:top-0 after:left-0 after:w-full after:h-full after:hover:flex after:text-purple-200 after:items-center after:justify-center after:bg-black/40 after:transition-all after:duration-300 ${
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

      <select
        id={labelFor}
        className={` ${stylesInput ? stylesInput : fixedInputClass} ${
          error ? "text-red-400" : ""
        } ${updateValue ? "" : "hidden"}`}
        {...register(name, {
          onChange: handleChange,
          onBlur: () => setUpdateValue(false),
          value: item,
        })}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <span className="text-red-500 text-sm italic">{error}</span>}
    </div>
  );
}
