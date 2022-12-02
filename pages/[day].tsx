import { GetServerSidePropsContext } from 'next';
import { useEffect, useState } from 'react';
import { Data } from './api/day1';

export default function ProductPage({ day }: { day: string }) {
  const [data, setData] = useState<Data | null>(null);
  const [value, setValue] = useState('');
  useEffect(() => {
    if (value) {
      fetch(`/api/${day}`, { body: value, method: 'POST' })
        .then(resp => resp.json())
        .then(resp => setData(resp));
    }
  }, [value, day]);

  return (
    <div>
      <a href={`https://adventofcode.com/2022/day/${day.split('day')[1]}`} target="_">
        Go to Advent of Code
      </a>
      <br />
      <textarea value={value} onChange={e => setValue(e.target.value)} />
      <br />
      <p>First result: {data?.result1}</p>
      <br />
      <p>Second result: {data?.result2}</p>
      <br />
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
