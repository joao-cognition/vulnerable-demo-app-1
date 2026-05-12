describe("packages/app/src/api.js — makeApiCall", () => {
  let originalFetch;

  beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = jest.fn().mockResolvedValue({ ok: true });
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    global.fetch = originalFetch;
    console.log.mockRestore();
    jest.resetModules();
  });

  it("should classify a long token as 'long'", async () => {
    const { makeApiCall } = await import("../api.js");
    await makeApiCall();
    expect(console.log).toHaveBeenCalledWith("Token type:", "long");
  });

  it("should call fetch with the correct endpoint", async () => {
    const { makeApiCall } = await import("../api.js");
    await makeApiCall();
    expect(global.fetch).toHaveBeenCalledWith(
      "https://example.com/some/endpoint",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: expect.stringContaining("Bearer "),
        }),
      })
    );
  });
});

describe("packages/app/src/index.js — makeApiCall", () => {
  let originalFetch;

  beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = jest.fn().mockResolvedValue({ ok: true });
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    global.fetch = originalFetch;
    console.log.mockRestore();
    jest.resetModules();
  });

  it("should log token length and default timeout", async () => {
    const { makeApiCall } = await import("../index.js");
    await makeApiCall();
    expect(console.log).toHaveBeenCalledWith("Making API call to endpoint");
    expect(console.log).toHaveBeenCalledWith("Using default timeout of 5000ms");
  });

  it("should call fetch with authorization header", async () => {
    const { makeApiCall } = await import("../index.js");
    await makeApiCall();
    expect(global.fetch).toHaveBeenCalledWith(
      "https://example.com/some/other/endpoint",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: expect.stringContaining("Bearer "),
        }),
      })
    );
  });

  it("should return true", async () => {
    const { makeApiCall } = await import("../index.js");
    const result = await makeApiCall();
    expect(result).toBe(true);
  });
});
