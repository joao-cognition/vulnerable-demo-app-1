jest.mock('node-fetch');

import fetch from 'node-fetch';
import { waitFor200, checkEndpoint, verifyEndpoint } from '../wait';

describe('waitFor200', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.useRealTimers();
    console.log.mockRestore();
  });

  it('should resolve when endpoint returns 200', async () => {
    fetch.mockResolvedValueOnce({ status: 200 });

    const promise = waitFor200('http://localhost:3000');
    jest.advanceTimersByTime(1000);
    await Promise.resolve();

    const result = await promise;
    expect(result).toBe(200);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000');
  });

  it('should keep polling until 200 is received', async () => {
    fetch
      .mockResolvedValueOnce({ status: 503 })
      .mockResolvedValueOnce({ status: 503 })
      .mockResolvedValueOnce({ status: 200 });

    const promise = waitFor200('http://localhost:3000');

    jest.advanceTimersByTime(1000);
    await Promise.resolve();

    jest.advanceTimersByTime(1000);
    await Promise.resolve();

    jest.advanceTimersByTime(1000);
    await Promise.resolve();

    const result = await promise;
    expect(result).toBe(200);
    expect(fetch).toHaveBeenCalledTimes(3);
  });

  it('should handle URL objects', async () => {
    fetch.mockResolvedValueOnce({ status: 200 });

    const url = new URL('http://localhost:3000/health');
    const promise = waitFor200(url);
    jest.advanceTimersByTime(1000);
    await Promise.resolve();

    const result = await promise;
    expect(result).toBe(200);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/health');
  });

  it('should ignore fetch errors and keep polling', async () => {
    fetch
      .mockRejectedValueOnce(new Error('ECONNREFUSED'))
      .mockResolvedValueOnce({ status: 200 });

    const promise = waitFor200('http://localhost:3000');

    jest.advanceTimersByTime(1000);
    await Promise.resolve();
    await Promise.resolve();

    jest.advanceTimersByTime(1000);
    await Promise.resolve();

    const result = await promise;
    expect(result).toBe(200);
  });
});

describe('checkEndpoint', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.useRealTimers();
    console.log.mockRestore();
  });

  it('should delegate to waitFor200', async () => {
    fetch.mockResolvedValueOnce({ status: 200 });

    const promise = checkEndpoint('http://localhost:3000');
    jest.advanceTimersByTime(1000);
    await Promise.resolve();

    const result = await promise;
    expect(result).toBe(200);
  });
});

describe('verifyEndpoint', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.useRealTimers();
    console.log.mockRestore();
  });

  it('should delegate to waitFor200', async () => {
    fetch.mockResolvedValueOnce({ status: 200 });

    const promise = verifyEndpoint('http://localhost:3000');
    jest.advanceTimersByTime(1000);
    await Promise.resolve();

    const result = await promise;
    expect(result).toBe(200);
  });
});
