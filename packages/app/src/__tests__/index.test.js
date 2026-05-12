global.fetch = jest.fn().mockResolvedValue({ ok: true });

import { makeApiCall } from "../index.js";

describe("packages/app/src/index.js — makeApiCall", () => {
  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    fetch.mockClear();
  });

  afterEach(() => {
    console.log.mockRestore();
  });

  it("should log making an API call", async () => {
    await makeApiCall();
    expect(console.log).toHaveBeenCalledWith("Making API call to endpoint");
  });

  it("should log token length", async () => {
    await makeApiCall();
    expect(console.log).toHaveBeenCalledWith(
      "Token length:",
      expect.any(Number)
    );
  });

  it("should log default timeout message", async () => {
    await makeApiCall();
    expect(console.log).toHaveBeenCalledWith(
      "Using default timeout of 5000ms"
    );
  });

  it("should call fetch with the correct endpoint", async () => {
    await makeApiCall();
    expect(fetch).toHaveBeenCalledWith(
      "https://example.com/some/other/endpoint",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: expect.stringContaining("Bearer "),
        }),
      })
    );
  });

  it("should return true", async () => {
    const result = await makeApiCall();
    expect(result).toBe(true);
  });
});
