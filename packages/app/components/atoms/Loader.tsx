import React from "react";

type Props = {
  flexStart?: boolean;
  small?: boolean;
};

const Loader = ({ flexStart = false, small = false }: Props) => {
  return (
    <div className={`flex-center ${flexStart && "justify-start"}`}>
      <div
        className={`animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white ${
          small && "h-8 w-8"
        }`}
      ></div>
    </div>
  );
};

export default Loader;
