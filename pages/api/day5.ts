import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  result1: string;
  result2: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const spilitInput = req.body.split('\n\n');
  const currentPosition = spilitInput[0].split('\n');
  const directions = spilitInput[1].split('\n');
  const numOfStacks = Math.floor(currentPosition[0].length / 3);
  let positionArray: string[][] = [];
  for (let i = 0; i < numOfStacks; i++) {
    positionArray.push([]);
  }
  for (let j = 0; j < currentPosition.length - 1; j++) {
    let stack = 1;
    for (let i = 1; i < currentPosition[0].length; i += 4) {
      const crate = currentPosition[j][i];
      if (crate != ' ') {
        positionArray[stack - 1].push(crate as string);
      }
      stack++;
    }
  }
  console.log(positionArray);
  for (let i = 0; i < directions.length; i++) {
    const removeFromString = directions[i].split(' from ');
    const numOfItems = parseInt(removeFromString[0].substring(4), 10);
    const removeToString = removeFromString[1].split(' to ');
    const fromStack = parseInt(removeToString[0], 10);
    const toStack = parseInt(removeToString[1], 10);
    for (let count = 0; count < numOfItems; count++) {
      const crateToMove = positionArray[fromStack - 1].shift() as string;
      positionArray[toStack - 1].unshift(crateToMove);
    }
  }
  console.log(positionArray);
  const result1 = positionArray.reduce(
    (topValues, stack) => (stack[0] ? topValues + stack[0] : topValues),
    '',
  );
  return res.status(200).json({ result1, result2: '' });
}
