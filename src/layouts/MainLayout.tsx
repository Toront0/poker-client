import React from "react";
import Header from "../components/Header/Header";
import Toaster from "../components/Toaster/Toaster";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-black h-full flex flex-col w-full ">
      <Header />
      <div className="w-full h-[calc(100%-56px)] relative">
        <Toaster />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
