/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormRegister } from "react-hook-form";

interface TextAreaProps {
  labelText: string;
  labelFor: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string | undefined;
  [x: string]: unknown;
}
const fixedInputClass =
  "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm resize-none";

export default function TextArea({
  labelText,
  name,
  labelFor,
  register,
  error,
  ...props
}: TextAreaProps) {
  return (
    <div className=" w-full">
      <label
        htmlFor={labelFor}
        className={`block text-gray-700 text-sm font-semibold mb-2 ${
          error ? "text-red-400 " : ""
        }`}
      >
        {labelText}
      </label>
      <textarea
        {...props}
        {...register}
        {...register(name)}
        rows={5}
        className={fixedInputClass + `${error ? "border-red-400" : ""}`}
      ></textarea>
      {error && <span className="text-red-500 text-sm italic">{error}</span>}
    </div>
  );
}
