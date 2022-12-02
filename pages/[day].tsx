import { GetServerSidePropsContext } from 'next';
import { useEffect, useState } from 'react';
import { showThisDate } from '../util/showThisDay';
import { Data } from './api/day1';

export default function ProductPage({ day }: { day: string }) {
  const [data, setData] = useState<Data | null>(null);
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (value) {
      setData(null);
      setIsLoading(true);
      console.log('calling', `/api/${day}`);
      fetch(`/api/${day}`, { body: value, method: 'POST' })
        .then(async resp => {
          if (resp.ok) return resp.json();
          throw Object.assign(new Error(resp.statusText), { statusCode: resp.status });
        })
        .then(resp => setData(resp))
        .catch(({ message, statusCode }) => {
          if (statusCode === 404) {
            setError(
              'This day has not been implemented yet. Either you are too early or I gave up :(',
            );
          } else {
            setError(`Error processing the result. ${message}`);
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [value, day]);

  const today = new Date();
  console.log(new Date('2022-12-25'), today.getDate());
  //const showThisDay = today > new Date('2022-12-25') || today.getDate() >= ;

  if (!showThisDate(parseInt(day.split('day')[1], 10))) {
    return (
      <div className="bg-slate-900 h-[100vh] text-[color:white] text-center flex flex-row">
        Day not released yet
      </div>
    );
  }

  const resultOrError = (result?: number) =>
    result || isLoading ? (
      <span className="text-teal-500 ml-2">{result}</span>
    ) : (
      <span className="text-red-500 ml-2">{error}</span>
    );
  return (
    <div className="bg-slate-900 h-[100vh] text-[color:white] text-center flex flex-row">
      <div className="flex flex-col w-1/2 p-5">
        <label htmlFor="todays-input" className="flex w-full h-[50vh] flex-col text-left">
          Enter today's input:
          <textarea
            id="todays-input"
            value={value}
            onChange={e => setValue(e.target.value)}
            className="bg-slate-500 w-full h-full mt-2"
          />
        </label>
        <a
          href={`https://adventofcode.com/2022/day/${day.split('day')[1]}`}
          target="_"
          className="text-left text-cyan-300 hover:underline mt-2"
        >
          See today's problem
        </a>
      </div>
      <div className="flex flex-col p-5 text-left w-1/2">
        <p className="mt-8">Part 1 Result: {resultOrError(data?.result1)}</p>
        <p className="mt-8">Part 2 Result: {resultOrError(data?.result2)}</p>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { day } = context?.query || {};
  return {
    props: {
      day,
    },
  };
}
