global.fetch = jest.fn().mockResolvedValue({ ok: true });

import { makeApiCall } from '../api';

describe('makeApiCall (api)', () => {
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
      'https://example.com/some/endpoint',
      expect.objectContaining({
        headers: expect.objectContaining({
          'Authorization': expect.stringContaining('Bearer '),
        }),
      })
    );
  });

  it('should log token type', async () => {
    await makeApiCall();
    expect(console.log).toHaveBeenCalledWith('Token type:', 'long');
  });
});
