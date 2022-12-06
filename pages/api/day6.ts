import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  result1: number;
  result2: number;
};

function findPacket(packetLength: number, datastreamBuffer: string) {
  let k = packetLength - 1;
  let currentBuffer = '';
  let inputLength = datastreamBuffer.length;
  while (k < inputLength) {
    currentBuffer = datastreamBuffer.substring(k - (packetLength - 1), k + 1);
    const noMatch = currentBuffer.split('').every(a => {
      const testString = currentBuffer;
      const find = testString.replaceAll(a, '');
      if (find.length < testString.length - 1) {
        return false;
      }
      return true;
    });
    if (noMatch) {
      break;
    }
    k++;
  }
  return k + 1;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const datastreamBuffer = req.body;

  const result1 = findPacket(4, datastreamBuffer);
  const result2 = findPacket(14, datastreamBuffer);

  return res.status(200).json({ result1, result2 });
}
