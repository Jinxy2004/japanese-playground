import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import NavBarLink from "./NavBarLink";
import Button from "./Button";

export default function NavBar() {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-foreground/20 bg-background py-5 px-24">
      <div className="relative flex items-center justify-center">
        <ul className="flex gap-10 text-lg">
          <NavBarLink page="about" pageName="About" />
          <NavBarLink page="furigana-adder" pageName="Furigana Adder" />
        </ul>

        <div className="absolute right-35">
          <ThemeToggle />
        </div>
        <div className="absolute right-0">
          <Button btnText="Sign Up/Sign In" />
        </div>
      </div>
    </div>
  );
}
