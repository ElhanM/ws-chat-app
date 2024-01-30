import React, { InputHTMLAttributes } from "react";

type InputProps = {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({
  label,
  type,
  name,
  id,
  placeholder,
  ...rest
}) => (
  <div>
    <label className="block mb-2 text-sm font-medium dark:text-white">
      {label}
    </label>
    <input
      name={name}
      placeholder={placeholder ?? ""}
      className="bg-gray-700 border border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 block w-full p-2.5 rounded-lg"
      type={type}
      autoComplete="off"
      {...rest}
    />
  </div>
);

export default Input;
