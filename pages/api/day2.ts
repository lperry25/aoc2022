import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  result1: number;
  result2: number;
}

// A + X = Rock = 1
// B + Y = Paper = 2
// C + Z = Scissors = 3

const WIN = 6;
const DRAW = 3;
const LOSS = 0;

const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;

// X > C 
// Y > A
// Z > B

type Opponnent = 'A' | 'B' | 'C';
type YourMove = 'X' | 'Y' | 'Z';
function outcomePoints(opponent: Opponnent, yourMove: YourMove){
  switch(yourMove){
    case 'X':
      if (opponent === 'A') return DRAW + ROCK;
      if (opponent === 'B') return LOSS + ROCK;
      if (opponent === 'C') return WIN + ROCK;
      throw new Error('Error in moves input. Invalid your move');
    case 'Y':
      if (opponent === 'A') return WIN + PAPER;
      if (opponent === 'B') return DRAW + PAPER;
      if (opponent === 'C') return LOSS + PAPER;
      throw new Error('Error in moves input. Invalid your move');
    case 'Z':
      if (opponent === 'A') return LOSS + SCISSORS;
      if (opponent === 'B') return WIN + SCISSORS;
      if (opponent === 'C') return DRAW + SCISSORS;
      throw new Error('Error in moves input. Invalid your move');
    default:
      throw new Error('Error in moves input. Invalid opponent move');
  }
}

function outcomePointsPart2(opponent: Opponnent, requiredOutcome: YourMove){
  switch(requiredOutcome){
    case 'X': // LOSE
      if (opponent === 'A') return LOSS + SCISSORS; // they play rock
      if (opponent === 'B') return LOSS + ROCK; // they play paper
      if (opponent === 'C') return LOSS + PAPER; // they play scissors
      throw new Error('Error in moves input. Invalid your move');
    case 'Y': // DRAW
      if (opponent === 'A') return DRAW + ROCK; // they play rock
      if (opponent === 'B') return DRAW + PAPER; // they play paper
      if (opponent === 'C') return DRAW + SCISSORS; // they play scissors
      throw new Error('Error in moves input. Invalid your move');
    case 'Z': // WIN
      if (opponent === 'A') return WIN + PAPER; // they play rock
      if (opponent === 'B') return WIN + SCISSORS; // they play paper
      if (opponent === 'C') return WIN + ROCK; // they play scissors
      throw new Error('Error in moves input. Invalid your move');
    default:
      throw new Error('Error in moves input. Invalid opponent move');
  }
}

type Move = `${Opponnent} ${YourMove}`;
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const strategy = req.body.split('\n').reduce((sum: Data, moves: Move) => {
    const splitMoves = moves.split(' ') as [Opponnent, YourMove];
    if (!splitMoves[0] || !splitMoves[0]){
      throw new Error('Error splitting the moves input');
    }
    return {
      result1: sum.result1 + outcomePoints(splitMoves[0], splitMoves[1]),
      result2: sum.result2 + outcomePointsPart2(splitMoves[0], splitMoves[1]),
    };
  }, {result1: 0, result2: 0});

  res.status(200).json(strategy);
}
