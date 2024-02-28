import { selectShowSidebar } from "@/lib/features/layout/sidebarSlice";
import React from "react";
import { useSelector } from "react-redux";

type Props = {
  children: React.ReactNode;
  noFlex?: boolean;
};

const SidebarComponentWrapper = ({ children, noFlex = false }: Props) => {
  const showSidebar = useSelector(selectShowSidebar);
  console.log({ showSidebar });

  return (
    <div
      className={`${showSidebar ? "block" : "hidden"} md:block w-full sm:w-4/5 md:w-1/4 border border-pale ${noFlex || "flex justify-center items-center md:flex md:justify-center md:items-center"}`}
    >
      {children}
    </div>
  );
};

export default SidebarComponentWrapper;
