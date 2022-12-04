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
    expect(result.result2).toBe(4);
  });
});