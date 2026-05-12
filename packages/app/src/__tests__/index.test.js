global.fetch = jest.fn().mockResolvedValue({ ok: true });

import { makeApiCall } from '../index';

describe('makeApiCall (index)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    console.log.mockRestore();
  });

  it('should call fetch with the endpoint URL', async () => {
    await makeApiCall();
    expect(global.fetch).toHaveBeenCalledWith(
      'https://example.com/some/other/endpoint',
      expect.objectContaining({
        headers: expect.objectContaining({
          'Authorization': expect.stringContaining('Bearer '),
        }),
      })
    );
  });

  it('should return true', async () => {
    const result = await makeApiCall();
    expect(result).toBe(true);
  });

  it('should log API call messages', async () => {
    await makeApiCall();
    expect(console.log).toHaveBeenCalledWith('Making API call to endpoint');
    expect(console.log).toHaveBeenCalledWith('Token length:', expect.any(Number));
    expect(console.log).toHaveBeenCalledWith('Using default timeout of 5000ms');
  });
});
