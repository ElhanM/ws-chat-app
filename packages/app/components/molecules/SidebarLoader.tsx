import React from "react";
import Loader from "../atoms/Loader";

type Props = {};

const SidebarLoader = (props: Props) => {
  return (
    <div className="w-1/4 border border-pale flex-center">
      <Loader />
    </div>
  );
};

export default SidebarLoader;
