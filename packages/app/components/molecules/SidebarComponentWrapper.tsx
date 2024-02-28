import { selectShowSidebar } from "@/lib/features/layout/sidebarSlice";
import React from "react";
import { useSelector } from "react-redux";

type Props = {
  children: React.ReactNode;
  noFlex?: boolean;
};

const SidebarComponentWrapper = ({ children, noFlex = false }: Props) => {
  const showSidebar = useSelector(selectShowSidebar);

  return (
    <>
      {showSidebar && (
        <div className="fixed inset-0 bg-black opacity-50 z-10 md:hidden" />
      )}
      <div
        className={`fixed z-20 transform transition-transform duration-500 ease-in-out ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 w-full sm:w-4/5 md:w-1/4 border border-pale ${noFlex || "flex justify-center items-center md:flex md:justify-center md:items-center"}`}
      >
        {children}
      </div>
    </>
  );
};

export default SidebarComponentWrapper;
