import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-screen flex justify-center items-center gap-4">
      <Link href="/viajes">Viajes</Link>
      <Link href="/form">Comidas</Link>
    </div>
  );
}
