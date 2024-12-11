import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-gradient-to-b from-[#1f1d24] to-[#2e1f5b] ">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold bg-white text-transparent bg-clip-text"
        >
          Pluck
        </Link>
      </div>
    </header>
  );
}
