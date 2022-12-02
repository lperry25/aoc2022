import Link from 'next/link';

export function NavBar() {
  const days = Array.from({ length: 25 }, (_, i) => i + 1);
  const links = days.map(num => (
    <Link className="m-1 hover:underline" href={`/day${num}`}>
      {num}
    </Link>
  ));

  return (
    <header className="bg-[color:black] text-[color:white] flex flex-row">
      <Link href="/">Home</Link>
      {links}
    </header>
  );
}
