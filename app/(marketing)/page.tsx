import Link from "next/link";

export default function HomePage() {
  return (
    <div className="w-full h-full grid place-items-center">
      <p>Home Page!</p>

      <Link href="/editor">Open editor</Link>
    </div>
  );
}
