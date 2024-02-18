import React from "react";
import Loader from "../atoms/Loader";

type Props = {
  children: React.ReactNode;
  noFlex?: boolean;
};

const SidebarComponentWrapper = ({ children, noFlex = false }: Props) => {
  return (
    <div className={`w-1/4 border border-pale ${noFlex || "flex-center"}`}>
      {children}
    </div>
  );
};

export default SidebarComponentWrapper;
