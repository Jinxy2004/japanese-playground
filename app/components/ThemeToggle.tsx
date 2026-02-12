"use client";

import { useTheme } from "next-themes";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="">
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        {theme === "dark" ? (
          <MdOutlineDarkMode size="24" />
        ) : (
          <MdOutlineLightMode size="24" />
        )}
      </button>
    </div>
  );
}
