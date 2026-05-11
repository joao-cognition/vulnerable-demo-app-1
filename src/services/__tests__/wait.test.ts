jest.mock('node-fetch', () => jest.fn());

import fetch from 'node-fetch';
import { waitFor200, checkEndpoint, verifyEndpoint } from '../wait';

const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('waitFor200', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(console, 'log').mockImplementation(() => {});
    mockFetch.mockReset();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('resolves when endpoint returns 200', async () => {
    mockFetch.mockResolvedValueOnce({ status: 200 } as any);

    const promise = waitFor200('http://example.com');
    jest.advanceTimersByTime(1000);
    await Promise.resolve();

    const result = await promise;
    expect(result).toBe(200);
    expect(mockFetch).toHaveBeenCalledWith('http://example.com');
  });

  it('retries when endpoint returns non-200', async () => {
    mockFetch
      .mockResolvedValueOnce({ status: 503 } as any)
      .mockResolvedValueOnce({ status: 200 } as any);

    const promise = waitFor200('http://example.com');

    jest.advanceTimersByTime(1000);
    await Promise.resolve();
    await Promise.resolve();

    jest.advanceTimersByTime(1000);
    await Promise.resolve();

    const result = await promise;
    expect(result).toBe(200);
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it('ignores fetch errors and retries', async () => {
    mockFetch
      .mockRejectedValueOnce(new Error('ECONNREFUSED'))
      .mockResolvedValueOnce({ status: 200 } as any);

    const promise = waitFor200('http://example.com');

    jest.advanceTimersByTime(1000);
    await Promise.resolve();
    await Promise.resolve();

    jest.advanceTimersByTime(1000);
    await Promise.resolve();

    const result = await promise;
    expect(result).toBe(200);
  });

  it('accepts URL object', async () => {
    mockFetch.mockResolvedValueOnce({ status: 200 } as any);

    const url = new URL('http://example.com/path');
    const promise = waitFor200(url);
    jest.advanceTimersByTime(1000);
    await Promise.resolve();

    const result = await promise;
    expect(result).toBe(200);
    expect(mockFetch).toHaveBeenCalledWith('http://example.com/path');
  });
});

describe('checkEndpoint', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(console, 'log').mockImplementation(() => {});
    mockFetch.mockReset();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('delegates to waitFor200', async () => {
    mockFetch.mockResolvedValueOnce({ status: 200 } as any);

    const promise = checkEndpoint('http://example.com');
    jest.advanceTimersByTime(1000);
    await Promise.resolve();

    const result = await promise;
    expect(result).toBe(200);
  });
});

describe('verifyEndpoint', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(console, 'log').mockImplementation(() => {});
    mockFetch.mockReset();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('delegates to waitFor200', async () => {
    mockFetch.mockResolvedValueOnce({ status: 200 } as any);

    const promise = verifyEndpoint('http://example.com');
    jest.advanceTimersByTime(1000);
    await Promise.resolve();

    const result = await promise;
    expect(result).toBe(200);
  });
});
