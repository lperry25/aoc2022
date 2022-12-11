import type { NextApiRequest, NextApiResponse } from 'next';
import _ from 'lodash';
import { cp } from 'fs';

type Data = {
  result1: number;
  result2: number;
};

type Direction = 'R' | 'L' | 'U' | 'D';
function moveHead(direction: Direction, x: number, y: number) {
  switch (direction) {
    case 'R':
      x++;
      break;
    case 'L':
      x--;
      break;
    case 'D':
      y--;
      break;
    case 'U':
      y++;
      break;
    default:
      throw new Error(`Unrecognixed direction in motions: ${direction}`);
  }
  return [x, y];
}

function getDistance(pos1: number, pos2: number): number {
  return pos1 - pos2;
}

function moveDirection(amount: number, coordinate: number) {
  if (amount < 0) {
    return (coordinate -= 1);
  }
  return (coordinate += 1);
}

function move(distanceX: number, distanceY: number, x: number, y: number) {
  if (Math.abs(distanceY) > 1) {
    y = moveDirection(distanceY, y);
    if (Math.abs(distanceX) > 0) {
      x = moveDirection(distanceX, x);
    }
  } else if (Math.abs(distanceX) > 1) {
    x = moveDirection(distanceX, x);
    if (Math.abs(distanceY) > 0) {
      y = moveDirection(distanceY, y);
    }
  }
  return [x, y];
}

function calculateKnotPositions(motions: string[][], knots: number, knotToCount: number) {
  // created starting arrays
  let uniqueKnotPos = ['0,0'];
  // always add the head position first
  let xPos = [0];
  let yPos = [0];
  for (let i = 0; i < knots; i++) {
    xPos.push(0);
    yPos.push(0);
  }

  for (let i = 0; i < motions.length; i++) {
    const direction = motions[i][0] as Direction;
    const placesMoved = parseInt(motions[i][1]);
    for (let j = 0; j < placesMoved; j++) {
      // move the head
      [xPos[0], yPos[0]] = moveHead(direction as Direction, xPos[0], yPos[0]);

      // move each knot based off of the knot or head ahead of it
      for (let knot = 1; knot <= knots; knot++) {
        // does the tail need to move
        const distanceX = getDistance(xPos[knot - 1], xPos[knot]);
        const distanceY = getDistance(yPos[knot - 1], yPos[knot]);
        const headTailTouching = Math.abs(distanceX) <= 1 && Math.abs(distanceY) <= 1;
        if (!headTailTouching) {
          // if not touching the tail should always follow in the direction of the head
          [xPos[knot], yPos[knot]] = move(distanceX, distanceY, xPos[knot], yPos[knot]);
          if (knot === knotToCount) {
            const newKnotPos = `${xPos[knot]},${yPos[knot]}`;
            if (!uniqueKnotPos.includes(newKnotPos)) {
              uniqueKnotPos.push(newKnotPos);
            }
          }
        }
      }
    }
  }
  return uniqueKnotPos.length;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  console.log(req.body);
  const motions: string[][] = req.body
    .split('\n')
    .map((directions: string) => directions.split(' '));

  const result1 = calculateKnotPositions(motions, 1, 1); // correct answer 6337
  const result2 = calculateKnotPositions(motions, 9, 9);

  return res.status(200).json({ result1, result2 });
}
