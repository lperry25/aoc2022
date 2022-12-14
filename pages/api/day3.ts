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
  const rucksacks = req.body.split('\n');
  const result1 = rucksacks.reduce((sum: number, rucksack: string) => {
    const middle = Math.floor(rucksack.length / 2);
    const compartment1 = rucksack.slice(0, middle);
    const compartment2 = rucksack.slice(middle);
    const itemsInBoth: string[] = compartment1.split('').reduce<string[]>((items, item) => {
      if (compartment2.includes(item) && !items.includes(item)) {
        return [...items, item];
      }
      return items;
    }, []);
    return sum + itemsInBoth.reduce<number>((a: number, b: string) => a + getItemValue(b), 0);
  }, 0);
  let result2 = 0;
  const badges = [];
  for (let i = 0; i < rucksacks.length - 2; i += 3) {
    const currentRucksack = rucksacks[i].split('');
    const partnerRucksack1 = rucksacks[i + 1];
    const partnerRucksack2 = rucksacks[i + 2];

    const badge = currentRucksack.find(
      (item: string) => partnerRucksack1.includes(item) && partnerRucksack2.includes(item),
    );
    badges.push(badge);
    result2 = result2 + getItemValue(badge);
  }

  return res.status(200).json({ result1, result2 });
}
