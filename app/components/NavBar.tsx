import Link from "next/link";

export default function NavBar() {
  return (
    <div className="fixed top-0 w-full flex items-center justify-around py-5 px-24 border-b border-gray-700 bg-black">
      <ul className="flex gap-10 text-lg">
        <Link href="/about">About Page</Link>
      </ul>
    </div>
  );
}
