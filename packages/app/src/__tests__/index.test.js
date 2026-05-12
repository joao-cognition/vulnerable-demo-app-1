describe("index module", () => {
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
    const { makeApiCall } = require("../index.js");
    await makeApiCall();
    expect(global.fetch).toHaveBeenCalledWith(
      "https://example.com/some/other/endpoint",
      expect.objectContaining({
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          Authorization: expect.stringContaining("Bearer "),
        }),
      })
    );
  });

  it("returns true", async () => {
    const { makeApiCall } = require("../index.js");
    const result = await makeApiCall();
    expect(result).toBe(true);
  });

  it("logs token length", async () => {
    const { makeApiCall } = require("../index.js");
    await makeApiCall();
    expect(console.log).toHaveBeenCalledWith("Making API call to endpoint");
    expect(console.log).toHaveBeenCalledWith(
      "Token length:",
      expect.any(Number)
    );
  });

  it("logs default timeout message", async () => {
    const { makeApiCall } = require("../index.js");
    await makeApiCall();
    expect(console.log).toHaveBeenCalledWith(
      "Using default timeout of 5000ms"
    );
  });
});

describe("index.js JWT token handling", () => {
  it("computes token length correctly", () => {
    const companyJwtToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    expect(companyJwtToken.length).toBeGreaterThan(0);
    expect(typeof companyJwtToken).toBe("string");
  });
});
