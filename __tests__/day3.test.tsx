import { createMocks } from 'node-mocks-http';
import handler from '../pages/api/day3';

describe('Day 3', () => {
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
      'vJrwpWtwJgWrhcsFMMfFFhFp\n' +
        'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL\n' +
        'PmmdzqPrVvPwwTWBwg\n' +
        'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn\n' +
        'ttgJtRGJQctTZtZT\n' +
        'CrZsJsPPZsGzwwsLwLmpwMDw',
    );
    // @ts-ignore
    const result = JSON.parse(response._getData());
    expect(result.result1).toBe(157);
    expect(result.result2).toBe(70);
  });

  it('passes the test case 2', async () => {
    const response = await solve(
      'RCMRQjLLWGTjnlnZwwnZJRZH\n' +
        'qnvfhpSbvSppNddNdSqbbmmdPrwttJVrVPDVrJtHtwPZhrPJ\n' +
        'BFpFzSSqSFFSvQsnWgCMjTLzng\n' +
        'DbWVcVRRdlLffvtqjTWNgQ\n' +
        'DbWVcVRRdlLffvtqjTWNgQ\n' +
        'mJJMpsmrMrJSHJpsHrFHvBvgHvqfNvzffgTvfj\n' +
        'mMhPjmjmFPJhMSGGcDRlwRdcLGPc\n' +
        'qFcbmWFJqqWpRJcQWpqsQQQwSPCPrHRHCPdNZtSrSHwrNZ\n' +
        'jGMjGLhhhgTvghgtGVjnNCrPVwZSZffSNSwHZZdH\n' +
        'DvzDlvvhnjlMlglglGGhDLpqqcJWWtsmszpWbBBBmQmb\n' +
        'SPLPHQbJSbPsvTLmfDvVDctvWhcDlD\n' +
        'jdRRzzGgJqwrpMRMgdjlcVcWqfWWlfDlmmlWhB\n' +
        'rwgRGdpGprNNLQLsbZJPsn\n' +
        'GZhTVLztHrSzrRBz\n' +
        'MJWjMvsfSCLSnrJn\n' +
        'MjglcgWMdccvZGFtTDchLLLh',
    );
    // @ts-ignore
    const result = JSON.parse(response._getData());
    expect(result.result2).toBe(110);
  });
});
