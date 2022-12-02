import type { NextApiRequest, NextApiResponse } from 'next'

export type Data = {
  result1: number;
  result2: number;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const elfsFood = req.body.split('\n\n').map((elfsFood: string) => {
    return elfsFood.split('\n').reduce((a: number, b:string) => a + parseInt(b,10), 0)
  });
  const maxCalories = Math.max(...elfsFood);

  const orderedCalories = elfsFood.sort((a: number, b: number) => b - a);
  const top3Calories = orderedCalories[0] + orderedCalories[1] + orderedCalories[2];

  res.status(200).json({ result1: maxCalories, result2: top3Calories })
}
