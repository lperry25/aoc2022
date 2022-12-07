import type { NextApiRequest, NextApiResponse } from 'next';
import _ from 'lodash';

type Data = {
  result1: number;
  result2: number;
};

function buildTree(terminalOutput: string[]) {
  // I assume every first command is cd / and the tree root is /
  let tree = {};
  let currentDirectory = '';
  for (let i = 1; i < terminalOutput.length; i++) {
    if (terminalOutput[i].charAt(0) === '$') {
      const command = terminalOutput[i].split(' ');
      // a command was input => commands are either ls or cd
      if (command[1] === 'cd') {
        if (command[2] === '..') {
          // remove the last to appended directories
          const temp = currentDirectory.split('.');
          const temp2 = temp.slice(0, temp.length - 1);
          currentDirectory = temp2.join('.');
        } else {
          currentDirectory = `${currentDirectory}.${command[2]}`;
        }
      }
    } else {
      const listItem = terminalOutput[i].split(' ');
      let newAddition;
      if (listItem[0] === 'dir') {
        newAddition = 'dir';
      } else {
        newAddition = parseInt(listItem[0], 10);
      }
      // @ts-ignore
      tree[currentDirectory] = {
        // @ts-ignore
        ...tree[currentDirectory],
        [listItem[1]]: newAddition,
      };
    }
  }
  return tree;
}

function calculateFolderSizes(tree: {}) {
  let directorySizes = {};
  const reversedDirectory = Object.keys(tree).reverse();
  for (let i = 0; i < reversedDirectory.length; i++) {
    const directoryKey = reversedDirectory[i];
    // @ts-ignore
    directorySizes[directoryKey] = Object.entries(tree[directoryKey]).reduce((sum, entry) => {
      if (entry[1] === 'dir') {
        // @ts-ignore
        return sum + directorySizes[`${directoryKey}.${entry[0]}`];
      } else {
        // @ts-ignore
        return sum + entry[1];
      }
    }, 0);
  }
  return directorySizes;
}

const TOTAL_DISK_SIZE = 70000000;
const UPDATE_SIZE = 30000000;
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const terminalOutput = req.body.split('\n');

  const tree = buildTree(terminalOutput);

  const sizeTree = calculateFolderSizes(tree);
  const sizes = Object.values(sizeTree) as number[];
  const result1 = sizes.reduce<number>(
    (sum: number, size: number) => (size < 100000 ? size + sum : sum),
    0,
  );

  const totalDirectorySize = Math.max(...sizes);
  const currentAvailableSpace = TOTAL_DISK_SIZE - totalDirectorySize;

  const additionalSpaceNeeded = UPDATE_SIZE - currentAvailableSpace;
  const bigDirectoriesToDelete = sizes.filter(size => size > additionalSpaceNeeded);
  const result2 = Math.min(...bigDirectoriesToDelete);

  return res.status(200).json({ result1, result2 });
}
