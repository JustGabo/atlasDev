import HomeContent from "@/components/Content";
import React from "react";

const HomePage = () => {
  return (
    <>
      <div className="hidden w-full lg:block">
        <HomeContent />
      </div>

      <div className="h-screen w-full flex items-center justify-center lg:hidden bg-[#F9FAFE] text-neutral-700">
        <h2 className="text-neutral-500 font-medium">Still not available in mobile</h2>
      </div>
    </>
  );
};

export default HomePage;
