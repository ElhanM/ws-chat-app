import React, { InputHTMLAttributes } from "react";

type InputProps = {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
} & InputHTMLAttributes<HTMLInputElement>;

// we need a ref here because otherwise Jest complains during testing
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, type, name, id, placeholder, ...rest }, ref) => (
    <div className="w-full max-w-md">
      <div className="relative w-full h-10">
        <input
          name={name}
          placeholder=" "
          className="peer w-full h-full bg-transparent text-white font-sans font-normal outline-none focus:outline-none disabled:bg-gray-800 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-600 placeholder-shown:border-t-gray-600 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-md border-gray-700 focus:border-gray-400"
          type={type}
          autoComplete="off"
          {...rest}
        />
        <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-300 before:border-gray-600 peer-focus:before:!border-gray-400 after:border-gray-600 peer-focus:after:!border-gray-400">
          {label}
        </label>
      </div>
    </div>
  )
);

Input.displayName = "Input";

export default Input;
