"use client";
import React from "react";
import Link from "next/link";
import ThemeButton from "../ThemeButton";
import NavLinks from "./NavLinks";
import { BsBank } from "react-icons/bs";


export default function Nav() {
  return (
    <nav className="bg-[#005fa5] dark:bg-[#414142] max-w-screen h-[60px] flex items-center relative">
      <div className="flex flex-row w-full max-w-[90rem] mx-auto justify-between px-4 w-[90rem]:px-0 text-white">
        <div className="uppercase flex flex-row gap-2 items-center font-bold hover:scale-110">
        <BsBank size={24} />
          <Link href="/">Chas Bank</Link>
        </div>
        <div className="flex flex-row mr-4 xl:mr-0">
          <ul className=" md:text-[18px]">
            <NavLinks />
          </ul>
        </div>
        <div className="top-1.5 right-1.5 2xl:right-6 2xl:top-2  absolute">
          <ThemeButton />
        </div>
      </div>
    </nav>
  );
}
