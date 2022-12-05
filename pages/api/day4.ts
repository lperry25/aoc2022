import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  result1: number;
  result2: number;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const pairs = req.body.split('\n');
  const result1 = pairs.filter((pair: string) => {
    const elfs = pair.split(',');
    const elf1 = elfs[0].split('-');
    const elf2 = elfs[1].split('-');

    // find which elfs section is smaller to start with
    const elf1Min = parseInt(elf1[0], 10);
    const elf1Max = parseInt(elf1[1], 10);
    const elf2Min = parseInt(elf2[0], 10);
    const elf2Max = parseInt(elf2[1], 10);
    if (elf1Min <= elf2Min && elf1Max >= elf2Max) {
      return true;
    }
    if (elf2Min <= elf1Min && elf2Max >= elf1Max) {
      return true;
    }
    return false;
  }).length;

  const result2 = pairs.filter((pair: string) => {
    const elfs = pair.split(',');
    const elf1 = elfs[0].split('-');
    const elf2 = elfs[1].split('-');

    const elf1Min = parseInt(elf1[0], 10);
    const elf1Max = parseInt(elf1[1], 10);
    const elf2Min = parseInt(elf2[0], 10);
    const elf2Max = parseInt(elf2[1], 10);
    if (elf1Min < elf2Min && elf1Max < elf2Min) {
      return false;
    }
    if (elf2Min < elf1Min && elf2Max < elf1Min) {
      return false;
    }
    return true;
  }).length;

  return res.status(200).json({ result1, result2 });
}
