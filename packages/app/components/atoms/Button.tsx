import React, { ButtonHTMLAttributes } from "react";

type ButtonProps = {
  text: string;
  type?: "button" | "submit" | "reset";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ text, type = "button", ...rest }) => (
  <button
    type={type}
    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    {...rest}
  >
    {text}
  </button>
);

export default Button;
