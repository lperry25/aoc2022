import { createMocks } from 'node-mocks-http';
import handler from '../pages/api/day4';

describe('Day4', () => {
  const solve = async (input: string) => {
    const { req, res } = createMocks({
      method: 'POST',
      // @ts-ignore
      body: input,
    });
    return await handler(req, res);
  };

  it('passes the test case for part 1 and 2', async () => {
    const response = await solve(
      '2-4,6-8\n' + '2-3,4-5\n' + '5-7,7-9\n' + '2-8,3-7\n' + '6-6,4-6\n' + '2-6,4-8',
    );
    // @ts-ignore
    const result = JSON.parse(response._getData());
    expect(result.result1).toBe(2);
  });

  it('passes part of the input case for part 1 and 2', async () => {
    const response = await solve(
      '4-38,14-141\n' + '2-3,4-5\n' + '5-7,7-9\n' + '2-8,3-7\n' + '6-6,4-6\n' + '2-6,4-8',
    );
    // @ts-ignore
    const result = JSON.parse(response._getData());
    expect(result.result1).toBe(2);
  });
});

2 - 10, 3 - 55;
36 - 90, 36 - 46;
9 - 97, 8 - 87;
75 - 92, 51 - 92;
6 - 82, 1 - 83;
21 - 79, 29 - 80;
26 - 66, 27 - 27;
11 - 32, 11 - 32;
6 - 90, 91 - 91;
36 - 78, 21 - 65;
66 - 66, 23 - 66;
22 - 23, 22 - 95;
3 - 82, 3 - 35;
1 - 92, 93 - 93;
