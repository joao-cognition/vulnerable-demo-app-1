jest.mock("node-fetch", () => jest.fn(), { virtual: true });

import fetch from "node-fetch";
import { waitFor200, checkEndpoint, verifyEndpoint } from "../wait.ts";

describe("waitFor200", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(console, "log").mockImplementation(() => {});
    fetch.mockReset();
  });

  afterEach(() => {
    jest.useRealTimers();
    console.log.mockRestore();
  });

  it("should resolve when endpoint returns 200", async () => {
    fetch.mockResolvedValueOnce({ status: 200 });

    const promise = waitFor200("http://localhost:3000");
    jest.advanceTimersByTime(1000);
    await Promise.resolve();

    await expect(promise).resolves.toBe(200);
  });

  it("should keep polling when endpoint returns non-200", async () => {
    fetch
      .mockResolvedValueOnce({ status: 503 })
      .mockResolvedValueOnce({ status: 200 });

    const promise = waitFor200("http://localhost:3000");

    jest.advanceTimersByTime(1000);
    await Promise.resolve();

    jest.advanceTimersByTime(1000);
    await Promise.resolve();

    await expect(promise).resolves.toBe(200);
  });

  it("should keep polling when fetch throws", async () => {
    fetch
      .mockRejectedValueOnce(new Error("ECONNREFUSED"))
      .mockResolvedValueOnce({ status: 200 });

    const promise = waitFor200("http://localhost:3000");

    jest.advanceTimersByTime(1000);
    await Promise.resolve();

    jest.advanceTimersByTime(1000);
    await Promise.resolve();

    await expect(promise).resolves.toBe(200);
  });

  it("should accept URL objects", async () => {
    fetch.mockResolvedValueOnce({ status: 200 });

    const promise = waitFor200(new URL("http://localhost:3000"));
    jest.advanceTimersByTime(1000);
    await Promise.resolve();

    await expect(promise).resolves.toBe(200);
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/");
  });

  it("should log while waiting", async () => {
    fetch.mockResolvedValueOnce({ status: 200 });

    const promise = waitFor200("http://localhost:3000");
    jest.advanceTimersByTime(1000);
    await Promise.resolve();
    await promise;

    expect(console.log).toHaveBeenCalledWith("waiting for", "http://localhost:3000");
  });
});

describe("checkEndpoint", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(console, "log").mockImplementation(() => {});
    fetch.mockReset();
  });

  afterEach(() => {
    jest.useRealTimers();
    console.log.mockRestore();
  });

  it("should delegate to waitFor200", async () => {
    fetch.mockResolvedValueOnce({ status: 200 });

    const promise = checkEndpoint("http://localhost:4000");
    jest.advanceTimersByTime(1000);
    await Promise.resolve();

    await expect(promise).resolves.toBe(200);
  });
});

describe("verifyEndpoint", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(console, "log").mockImplementation(() => {});
    fetch.mockReset();
  });

  afterEach(() => {
    jest.useRealTimers();
    console.log.mockRestore();
  });

  it("should delegate to waitFor200", async () => {
    fetch.mockResolvedValueOnce({ status: 200 });

    const promise = verifyEndpoint("http://localhost:5000");
    jest.advanceTimersByTime(1000);
    await Promise.resolve();

    await expect(promise).resolves.toBe(200);
  });
});
