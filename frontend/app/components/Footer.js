import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#005fa5] dark:bg-[#414142] text-white bottom-0 left-0 w-full h-40 flex items-center ">
      <div className="w-full max-w-[90rem] mx-auto flex flex-col px-4">
        <div className="pt-6 flex flex-col gap-1 pb-4">
          <h3 className="text-[18px] pb-1">Contact:</h3>
          <p>
            Phone: <span> 08 4440004</span>
          </p>
          <p>
            E-mail: <span> contact@chasbank.se</span>
          </p>
        </div>
        <div className="w-full flex justify-center pt-2 pb-1 border-t">
          <p className="text-[12px]">© Chas-Bank 2024</p>
        </div>
      </div>
    </footer>
  );
}
