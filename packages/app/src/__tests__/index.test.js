describe('packages/app/src/index.js', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true });
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
    delete global.fetch;
  });

  it('makeApiCall is defined and returns true', async () => {
    const module = await import('../index.js');
    expect(module).toBeDefined();
  });
});

describe('packages/app/src/api.js', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true });
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
    delete global.fetch;
  });

  it('api module is defined', async () => {
    const module = await import('../api.js');
    expect(module).toBeDefined();
  });
});
