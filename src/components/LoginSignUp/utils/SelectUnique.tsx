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

const fixedInputClass =
  "rounded-md appearance-none  relative block w-full px-3 py-2  rounded h-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm";
const fixedLabelClass =
  "block text-gray-700 text-sm font-light font-semibold  text-white";

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

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItems(event.target.value as unknown as number);
  };

  return (
    <div>
      <label
        htmlFor={labelFor}
        className={` ${fixedLabelClass}  ${error ? "text-red-400" : ""}`}
      >
        {labelText}
      </label>
      <select
        id={labelFor}
        className={` ${fixedInputClass}  ${error ? "text-red-400" : ""}`}
        value={items}
        {...register(name)}
        onChange={handleChange}
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
