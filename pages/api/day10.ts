import type { NextApiRequest, NextApiResponse } from 'next';
import _ from 'lodash';

type Data = {
  result1: number;
  result2: number;
};

function addx(cycle: number, x: number, xAddition: number) {
  cycle += 2;
  x += xAddition;
  return [cycle, x];
}
function noop(cycle: number) {
  return cycle++;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const signals: string[] = req.body.split('\n');

  let X = 1;
  let cycle = 0;
  let reportValues: number[] = [];
  let reportAt = [20, 60, 100, 140, 180, 220];

  const reportCycle = () => {
    const report = reportAt.find(report => report === cycle);
    if (report) {
      reportValues.push(report * X);
    }
  };
  for (let i = 0; i < signals.length; i++) {
    const instruction = signals[i].split(' ');
    if (instruction[0] === 'noop') {
      cycle++;
      reportCycle();
    } else {
      cycle++;
      reportCycle();
      cycle++;
      reportCycle();
      X += parseInt(instruction[1], 10);
    }
  }

  const result1 = reportValues.reduce((a, b) => a + b, 0);
  const result2 = 0;

  return res.status(200).json({ result1, result2 });
}
