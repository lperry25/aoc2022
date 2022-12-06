import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  result1: number;
  result2: number;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const datastreamBuffer = req.body;

  // first check if the first three characters are unique

  /*
  I think this solution would have been more efficient but it didn't work
  let i = 1;
  let currentBuffer = '';
  const length = datastreamBuffer.length;
  while (i < length) {
    if (i < 3) {
      currentBuffer = datastreamBuffer.substring(0, i);
    } else {
      currentBuffer = datastreamBuffer.substring(i - 3, i);
    }
    const checkCharacter = datastreamBuffer.charAt(i);

    const matchingIndex = currentBuffer.split('').findIndex(char => char === checkCharacter);
    console.log(currentBuffer, checkCharacter, i, matchingIndex);
    if (matchingIndex > -1) {
      i += matchingIndex + 1;
    } else {
      if (i > 3) {
        console.log('break');
        break;
      }
      i++;
    }
  }*/

  let i = 3;
  let currentBuffer = '';
  while (i < length) {
    currentBuffer = datastreamBuffer.substring(i - 3, i + 1);
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
    i++;
  }

  return res.status(200).json({ result1: i + 1, result2: 0 });
}
