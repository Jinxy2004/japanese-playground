import { ThemeToggle } from "./ThemeToggle";
import NavBarLink from "./NavBarLink";
import Button from "./Button";

export default function NavBar() {
  return (
    /*
This navbar works by first creating an outer div which houses everything. Then we create a div that will house
our other buttons. The css works by first creating a grid of 3 columns and having each item in it be centered
(in terms of the x axis). Then for the ul we justify-center so that the buttons are in the center, then for the
other buttons we justify-end so that they stick to the end
    */
    <div className="sticky top-0 w-full border-b border-foreground/20 bg-background px-8 py-5">
      <div className="grid grid-cols-3 items-center">
        <div />

        <ul className="flex justify-center gap-1.5 text-lg">
          <NavBarLink page="about" pageName="About" />
          <NavBarLink page="furigana-adder" pageName="Furigana Adder" />
        </ul>

        <div className="flex justify-end gap-1.5">
          <ThemeToggle />
          <Button btnText="Sign Up/Sign In" path="/user-account/signup" />
        </div>
      </div>
    </div>
  );
}
