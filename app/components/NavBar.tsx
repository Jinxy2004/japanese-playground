import Link from "next/link";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { ThemeToggle } from "./ThemeToggle";

export default function NavBar() {
  return (
    <div className="fixed top-0 w-full py-5 px-24 border-b border-gray-700 bg-black">
      <div className="relative flex items-center justify-center">
        <ul className="flex gap-10 text-lg">
          <Link href="/about">About Page</Link>
        </ul>

        <div className="absolute right-0">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
