"use client";

import { useTheme } from "next-themes";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <button
        type="button"
        aria-label="Toggle theme"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="rounded-lg border border-foreground/30 bg-background px-3 py-1.5 transition-all duration-200 hover:bg-linear-to-r hover:from-foreground/20 hover:to-foreground/5"
      >
        {theme === "dark" ? (
          <MdOutlineDarkMode size="24" />
        ) : (
          <MdOutlineLightMode size="24" />
        )}
      </button>
    </div>
  );
}
