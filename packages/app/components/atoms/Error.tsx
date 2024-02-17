import React from "react";

interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => (
  <div
    className="bg-inherit border border-inherit text-inherit px-4 py-3 rounded relative w-full h-full flex justify-center items-center"
    role="alert"
  >
    <span className="mr-1">Error: </span>
    <span className="block sm:inline font-bold"> {message}</span>
  </div>
);

export default Error;
