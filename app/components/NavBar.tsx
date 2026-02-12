import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export default function NavBar() {
  return (
    <div className="fixed top-0 w-full border-b border-foreground/20 bg-background py-5 px-24">
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
