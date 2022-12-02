import Link from 'next/link';
import { useRouter } from 'next/router';
import { showThisDate } from '../util/showThisDay';

export function NavBar() {
  const { asPath } = useRouter();

  const days = Array.from({ length: 25 }, (_, i) => i + 1);
  const links = days.map(num => {
    const disabled = !showThisDate(num);
    return (
      <Link
        className={`m-1 hover text-center rounded-3xl w-[25px] ${
          disabled ? 'bg-red-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-800'
        }`}
        href={!disabled ? `/day${num}` : asPath}
        key={`day-link-${num}`}
      >
        {num}
      </Link>
    );
  });

  return (
    <header className="bg-slate-900 text-white block h-contents md:h-[150px]">
      <div className="align-middle h-full md:pt-14 pl-4">
        <h1 className="text-3xl font-bold">
          Laura&apos;s
          <Link href="https://adventofcode.com/" className="hover:underline ml-2" target="_">
            Advent of Code 2022
          </Link>
        </h1>
        <p>Select a day to answer that day&apos;s puzzle</p>
      </div>
      <div className="grid grid-cols-5 w-[170px] m-auto md:text-right md:absolute md:right-4 md:top-4">
        {links}
      </div>
    </header>
  );
}
