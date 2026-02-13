import Link from "next/link";

export default function NavBarLink({ page }: { page: string }) {
  return (
    <div>
      <Link
        className="relative inline-block overflow-hidden rounded-lg border border-foreground/30 bg-background px-3 py-1.5 transition-colors duration-300 before:absolute 
        before:top-0 before:left-0 before:h-full before:w-0 before:bg-linear-to-r before:from-foreground/45 before:to-foreground/20 before:transition-all before:duration-300 hover:before:w-[50%] 
        after:absolute after:top-0 after:right-0 after:h-full after:w-0 after:bg-linear-to-l after:from-foreground/45 after:to-foreground/20 after:transition-all after:duration-300 hover:after:w-[50%]"
        href={`/${page}`}
      >
        <span className="relative z-10">About Page</span>
      </Link>
    </div>
  );
}
