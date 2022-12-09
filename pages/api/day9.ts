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

function diagonalMove(distanceX: number, distanceY: number, x: number, y: number) {
  if (distanceX > 1 && Math.abs(distanceY) > 0) {
    // console.log('increase')
    if (distanceY < 0) {
      y--;
    } else {
      y++;
    }
    // y += distanceY;
  }
  if (distanceY > 1 && Math.abs(distanceX) > 0) {
    if (distanceX < 0) {
      x--;
    } else {
      x++;
    }
    //x += distanceX;
  }
  return [x, y];
}

function move(distanceX: number, distanceY: number, x: number, y: number) {
  // console.log('increase')
  // make the first non diagonal move
  if (Math.abs(distanceY) > 1) {
    if (distanceY < 0) {
      y--;
    } else {
      y++;
    }
  }
  // y += distanceY;
  if (Math.abs(distanceX) > 1) {
    if (distanceX < 0) {
      x--;
    } else {
      x++;
    }
  }
  return diagonalMove(distanceX, distanceY, x, y);
}

function calculateKnotPositions(motions: string[][], knots: number, knotToCount: number) {
  // created starting arrays
  let uniqueKnotPos = ['0,0'];
  // always add the head position first
  let xPos = [0];
  let yPos = [0];
  for (let i = 0; i < knots; i++) {
    //uniqueKnotPos.push([]);
    xPos.push(0);
    yPos.push(0);
  }
  console.log({ uniqueKnotPos, xPos, yPos });

  for (let i = 0; i < motions.length; i++) {
    const direction = motions[i][0] as Direction;
    const placesMoved = parseInt(motions[i][1]);
    for (let j = 0; j < placesMoved; j++) {
      // move the head
      [xPos[0], yPos[0]] = moveHead(direction as Direction, xPos[0], yPos[0]);
      // console.log('head position', xPos[0], yPos[0]);

      // move each knot based off of the knot or head ahead of it
      for (let knot = 1; knot <= knots; knot++) {
        // does the tail need to move
        /* console.log({
          knotAhead: [xPos[knot - 1], yPos[knot - 1]],
          currentKnot: [xPos[knot], yPos[knot]],
        });*/
        const distanceX = getDistance(xPos[knot - 1], xPos[knot]);
        const distanceY = getDistance(yPos[knot - 1], yPos[knot]);
        console.log({ distanceX, distanceY });
        //console.log({ knot, distanceX, distanceY });
        const headTailTouching = Math.abs(distanceX) <= 1 && Math.abs(distanceY) <= 1;
        if (!headTailTouching) {
          // if not touching the tail should always follow in the direction of the head
          [xPos[knot], yPos[knot]] = move(distanceX, distanceY, xPos[knot], yPos[knot]);
          //console.log(direction, distanceX, distanceY, xPos[knot], yPos[knot]);
          /*[xPos[knot], yPos[knot]] = diagonalMove(
            direction,
            distanceX,
            distanceY,
            xPos[knot],
            yPos[knot],
          );*/
          if (knot === knotToCount) {
            //console.log('add to unique', knot);
            const newKnotPos = `${xPos[knot]},${yPos[knot]}`;
            if (!uniqueKnotPos.includes(newKnotPos)) {
              uniqueKnotPos.push(newKnotPos);
            }
          }
        }
        console.log([xPos[knot], yPos[knot]]);
        //console.log(xPos[knot], yPos[knot]);
      }
    }
    console.log(xPos, yPos);
  }
  //console.log(uniqueKnotPos);
  return uniqueKnotPos.length;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  console.log(req.body);
  const motions: string[][] = req.body
    .split('\n')
    .map((directions: string) => directions.split(' '));
  /*
  let uniqueKnotPos = [
    ['0,0'],
    ['0,0'],
    ['0,0'],
    ['0,0'],
    ['0,0'],
    ['0,0'],
    ['0,0'],
    ['0,0'],
    ['0,0'],
  ]; // starts at the starting position
  let currTailsX = 0;
  let currTailsY = 0;
  let currX = 0;
  let currY = 0;

  for (let i = 0; i < motions.length; i++) {
    const direction = motions[i][0] as Direction;
    const placesMoved = parseInt(motions[i][1]);
    for (let j = 0; j < placesMoved; j++) {
      [currX, currY] = move(direction as Direction, currX, currY);
      // does the tail need to move
      const distanceX = getDistance(currX, currTailsX);
      const distanceY = getDistance(currY, currTailsY);
      const headTailTouching = Math.abs(distanceX) <= 1 && Math.abs(distanceY) <= 1;
      if (!headTailTouching) {
        // if not touching the tail should always follow in the direction of the head
        [currTailsX, currTailsY] = move(direction, currTailsX, currTailsY);
        [currTailsX, currTailsY] = diagonalMove(
          direction,
          distanceX,
          distanceY,
          currTailsX,
          currTailsY,
        );
        // part 1 calculates on the first first since there only is one knot
        const newTailPos = `${currTailsX},${currTailsY}`;
        if (!uniqueKnotPos[0].includes(newTailPos)) {
          uniqueKnotPos[0].push(newTailPos);
        }
      }
    }
  }*/

  const result1 = calculateKnotPositions(motions, 1, 1); // correct answer 6337
  const result2 = 0; //calculateKnotPositions(motions, 9, 9);

  return res.status(200).json({ result1, result2 });
}
