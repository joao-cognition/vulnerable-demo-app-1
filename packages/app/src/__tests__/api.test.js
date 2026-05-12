global.fetch = jest.fn().mockResolvedValue({ ok: true });

import { makeApiCall } from "../api.js";

describe("packages/app/src/api.js — makeApiCall", () => {
  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    fetch.mockClear();
  });

  afterEach(() => {
    console.log.mockRestore();
  });

  it("should log token type as 'long' for the embedded JWT", async () => {
    await makeApiCall();
    expect(console.log).toHaveBeenCalledWith("Token type:", "long");
  });

  it("should call fetch with the correct endpoint", async () => {
    await makeApiCall();
    expect(fetch).toHaveBeenCalledWith(
      "https://example.com/some/endpoint",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: expect.stringContaining("Bearer "),
        }),
      })
    );
  });
});
