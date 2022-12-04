import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  result1: number;
  result2: number;
};

//Lowercase item types a through z have priorities 1 through 26.
//Uppercase item types A through Z have priorities 27 through 52.
function getItemValue(letter: string) {
  if (letter === letter.toLowerCase()) {
    // a starts at 97, so subtract 96 to make it 1
    return letter.charCodeAt(0) - 96;
  }
  // char code for A is 65, but we want it to start at 27
  return letter.charCodeAt(0) - 65 + 27;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const pairs = req.body.split('\n');
  const result1 = pairs.filter((pair: string) => {
    const elfs = pair.split(',');
    const elf1 = elfs[0].split('-');
    const elf2 = elfs[1].split('-');

    // find which elfs section is smaller to start with
    console.log({ elf1, elf2 });
    const elf1Min = parseInt(elf1[0], 10);
    const elf1Max = parseInt(elf1[1], 10);
    const elf2Min = parseInt(elf2[0], 10);
    const elf2Max = parseInt(elf2[1], 10);
    if (elf1Min <= elf2Min && elf1Max >= elf2Max) {
      console.log({ elf1Min, elf1Max, elf2Min, elf2Max }, true);
      return true;
    }
    if (elf2Min <= elf1Min && elf2Max >= elf1Max) {
      console.log({ elf1Min, elf1Max, elf2Min, elf2Max }, true);
      return true;
    }
    console.log({ elf1Min, elf1Max, elf2Min, elf2Max }, false);
    return false;
  }).length;
  console.log({ result1 });

  return res.status(200).json({ result1: result1, result2: 0 });
}
