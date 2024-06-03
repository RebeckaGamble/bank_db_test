"use client";
import React from "react";
import { useTheme } from "next-themes";
import {FiSun, FiMoon} from "react-icons/fi"


export default function ThemeButton() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button
      type="button"
      aria-label="Toggle Theme"
      className=""
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
    >
      {theme === "dark" ? <FiSun fill="white" /> : <FiMoon fill="white" />}
    </button>
  );
}
