import React from "react";
import { CgSpinner } from "react-icons/cg";

const Loader = () => {
  return (
    <div className="flex justify-center items-center bg-[#121419]">
      <CgSpinner className="animate-spin bg-[#121419] text-[#05c37c]" />
    </div>
  );
};

export default Loader;
