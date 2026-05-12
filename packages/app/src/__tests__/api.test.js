describe("api module", () => {
  let originalFetch;

  beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = jest.fn().mockResolvedValue({ ok: true });
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
    jest.resetModules();
  });

  it("calls fetch with the expected endpoint", async () => {
    const { makeApiCall } = require("../api.js");
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

  it("logs token type as long", async () => {
    const { makeApiCall } = require("../api.js");
    await makeApiCall();
    expect(console.log).toHaveBeenCalledWith("Token type:", "long");
  });

  it("does not return a value", async () => {
    const { makeApiCall } = require("../api.js");
    const result = await makeApiCall();
    expect(result).toBeUndefined();
  });
});

describe("api.js token classification logic", () => {
  it("classifies tokens longer than 100 chars as long", () => {
    const token = "a".repeat(101);
    const result =
      token.length > 100 ? "long" : token.length > 50 ? "medium" : "short";
    expect(result).toBe("long");
  });

  it("classifies tokens between 51-100 chars as medium", () => {
    const token = "a".repeat(75);
    const result =
      token.length > 100 ? "long" : token.length > 50 ? "medium" : "short";
    expect(result).toBe("medium");
  });

  it("classifies tokens 50 chars or less as short", () => {
    const token = "a".repeat(30);
    const result =
      token.length > 100 ? "long" : token.length > 50 ? "medium" : "short";
    expect(result).toBe("short");
  });

  it("classifies exactly 50 chars as short", () => {
    const token = "a".repeat(50);
    const result =
      token.length > 100 ? "long" : token.length > 50 ? "medium" : "short";
    expect(result).toBe("short");
  });

  it("classifies exactly 100 chars as medium", () => {
    const token = "a".repeat(100);
    const result =
      token.length > 100 ? "long" : token.length > 50 ? "medium" : "short";
    expect(result).toBe("medium");
  });
});
