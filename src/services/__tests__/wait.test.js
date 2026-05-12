const mockFetch = jest.fn();
jest.mock("node-fetch", () => mockFetch, { virtual: true });

import { waitFor200, checkEndpoint, verifyEndpoint } from "../wait.ts";

describe("waitFor200", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockFetch.mockReset();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should resolve with 200 when endpoint returns 200 on first try", async () => {
    mockFetch.mockResolvedValueOnce({ status: 200 });

    const promise = waitFor200("http://localhost:3000");

    jest.advanceTimersByTime(1000);
    await Promise.resolve();

    await expect(promise).resolves.toBe(200);
  });

  it("should keep polling until endpoint returns 200", async () => {
    mockFetch
      .mockResolvedValueOnce({ status: 503 })
      .mockResolvedValueOnce({ status: 503 })
      .mockResolvedValueOnce({ status: 200 });

    const promise = waitFor200("http://localhost:3000");

    jest.advanceTimersByTime(1000);
    await Promise.resolve();
    await Promise.resolve();

    jest.advanceTimersByTime(1000);
    await Promise.resolve();
    await Promise.resolve();

    jest.advanceTimersByTime(1000);
    await Promise.resolve();
    await Promise.resolve();

    await expect(promise).resolves.toBe(200);
    expect(mockFetch).toHaveBeenCalledTimes(3);
  });

  it("should ignore fetch errors and continue polling", async () => {
    mockFetch
      .mockRejectedValueOnce(new Error("ECONNREFUSED"))
      .mockResolvedValueOnce({ status: 200 });

    const promise = waitFor200("http://localhost:3000");

    jest.advanceTimersByTime(1000);
    await Promise.resolve();
    await Promise.resolve();

    jest.advanceTimersByTime(1000);
    await Promise.resolve();
    await Promise.resolve();

    await expect(promise).resolves.toBe(200);
  });

  it("should accept a URL object", async () => {
    mockFetch.mockResolvedValueOnce({ status: 200 });

    const url = new URL("http://localhost:3000/health");
    const promise = waitFor200(url);

    jest.advanceTimersByTime(1000);
    await Promise.resolve();

    await expect(promise).resolves.toBe(200);
    expect(mockFetch).toHaveBeenCalledWith("http://localhost:3000/health");
  });
});

describe("checkEndpoint", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockFetch.mockReset();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should delegate to waitFor200", async () => {
    mockFetch.mockResolvedValueOnce({ status: 200 });

    const promise = checkEndpoint("http://localhost:3000");

    jest.advanceTimersByTime(1000);
    await Promise.resolve();

    await expect(promise).resolves.toBe(200);
  });
});

describe("verifyEndpoint", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockFetch.mockReset();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should delegate to waitFor200", async () => {
    mockFetch.mockResolvedValueOnce({ status: 200 });

    const promise = verifyEndpoint("http://localhost:3000");

    jest.advanceTimersByTime(1000);
    await Promise.resolve();

    await expect(promise).resolves.toBe(200);
  });
});
