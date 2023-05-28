import React from "react";

const FormBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center h-full">
      <div className=" w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-3/12 bg-gray-300 p-5 px-8 rounded-xl my-auto">{children}</div>
    </div>
  );
};

export default FormBox;
