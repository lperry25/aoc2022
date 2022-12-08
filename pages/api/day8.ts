import type { NextApiRequest, NextApiResponse } from 'next';
import _ from 'lodash';
import { cp } from 'fs';

type Data = {
  result1: number;
  result2: number;
};

function transpose(a: string[][]) {
  return Object.keys(a[0]).map(function (c) {
    return a.map(function (r) {
      // @ts-ignore
      return r[c];
    });
  });
}

function calculateTreesInView(index: number, positionFromEdge: number) {
  if (index > -1) {
    // a tree blocked it's view at this index
    return index + 1;
  }
  // no tree blocked the view, so they can see as many trees that are in that direction
  return positionFromEdge;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const treeGrid: string[][] = req.body
    .split('\n')
    .map((treeRow: string) => treeRow.split('').map(height => parseInt(height, 10)));

  const treeGridTranspose = transpose(treeGrid);
  const exteriorTreeCount = treeGrid.length * 2 + (treeGrid[0].length - 2) * 2;

  let visibleInteriorTrees = 0;
  let treeViewingDistances = [];
  const rowLength = treeGrid.length;
  const colLength = treeGrid[0].length;
  for (let row = 0; row < rowLength; row++) {
    for (let col = 0; col < colLength; col++) {
      const height = treeGrid[row][col];
      const treesLeft = treeGrid[row].slice(0, col).reverse();
      const treesRight = treeGrid[row].slice(col + 1);
      const treesTop = treeGridTranspose[col].slice(0, row).reverse();
      const treesBottom = treeGridTranspose[col].slice(row + 1);

      const treeLeftDistance = treesLeft.findIndex(treeHeight => treeHeight >= height);
      const treeRightDistance = treesRight.findIndex(treeHeight => treeHeight >= height);
      const treeTopDistance = treesTop.findIndex(treeHeight => treeHeight >= height);
      const treeBottomDistance = treesBottom.findIndex(treeHeight => treeHeight >= height);

      if (row > 0 && col > 0 && row < rowLength - 1 && col < colLength - 1) {
        // part 1 calculation excludes the exterior rows and columns
        const isVisibleLeft = treeLeftDistance === -1;
        const isVisibleRight = treeRightDistance === -1;
        const isVisibleTop = treeTopDistance === -1;
        const isVisibleBottom = treeBottomDistance === -1;
        if (isVisibleLeft || isVisibleRight || isVisibleBottom || isVisibleTop) {
          visibleInteriorTrees++;
        }
      }
      // part 2 is calculated on all trees
      const treesInViewScore =
        calculateTreesInView(treeLeftDistance, col) *
        calculateTreesInView(treeRightDistance, rowLength - (col + 1)) *
        calculateTreesInView(treeTopDistance, row) *
        calculateTreesInView(treeBottomDistance, colLength - (row + 1));
      treeViewingDistances.push(treesInViewScore);
    }
  }

  const result1 = exteriorTreeCount + visibleInteriorTrees;
  const result2 = Math.max(...treeViewingDistances);

  return res.status(200).json({ result1, result2 });
}
