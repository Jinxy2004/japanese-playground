import Link from "next/link";

export default function NavBarLink({
  page,
  pageName,
}: {
  page: string;
  pageName: string;
}) {
  return (
    <div>
      <Link
        className="rounded-lg border border-foreground/30 bg-background px-3 py-1.5 transition-all duration-200 hover:bg-linear-to-r hover:from-foreground/20 hover:to-foreground/5"
        href={`/${page}`}
      >
        <span className="relative z-10">{pageName}</span>
      </Link>
    </div>
  );
}
