/* eslint-disable @typescript-eslint/no-explicit-any */
import { FileInput } from "flowbite-react";
import { UseFormRegister } from "react-hook-form";

interface InputProps {
  labelText: string;
  labelFor: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string | undefined;
  stylesLabel?: string;
  stylesInput?: string;
  value?: string | number;
  type?: string;
  [x: string]: unknown;
}

const fixedInputClass =
  "rounded-md appearance-none   relative block w-full px-3   rounded h-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm";
const fixedLabelClass =
  "block text-gray-700 text-sm mb-2 font-light font-semibold ";

export default function Input({
  labelText,
  name,
  labelFor,
  register,
  stylesInput,
  stylesLabel,
  error,
  value,
  type,
  ...props
}: InputProps) {
  return (
    <div className={" w-full " + `${type === "file" ? "col-span-2" : ""}`}>
      <label
        htmlFor={labelFor}
        className={`${stylesLabel ? stylesLabel : fixedLabelClass} ${
          error ? "text-red-400" : ""
        }`}
      >
        {labelText}
      </label>
      {type === "file" ? (
        <FileInput
          sizing="lg"
          id={labelFor}
          {...props}
          {...register(name)}
          value={value}
        />
      ) : (
        <input
          id={labelFor}
          {...props}
          {...register(name)}
          value={value}
          type={type}
          className={`${stylesInput ? stylesInput : fixedInputClass} ${
            error ? "border-red-400" : ""
          }`}
        />
      )}
      {error && <span className="text-red-500 text-sm italic">{error}</span>}
    </div>
  );
}
