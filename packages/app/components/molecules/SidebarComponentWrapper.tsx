import React from "react";
import Loader from "../atoms/Loader";

type Props = {
  children: React.ReactNode;
};

const SidebarComponentWrapper = ({ children }: Props) => {
  return (
    <div className="w-1/4 border border-pale flex justify-center items-center">
      {children}
    </div>
  );
};

export default SidebarComponentWrapper;
