jest.mock("node-fetch");

const fetch = require("node-fetch");

describe("wait service", () => {
  let waitFor200, checkEndpoint, verifyEndpoint;

  beforeAll(() => {
    const waitModule = require("../wait.ts");
    waitFor200 = waitModule.waitFor200;
    checkEndpoint = waitModule.checkEndpoint;
    verifyEndpoint = waitModule.verifyEndpoint;
  });

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  describe("waitFor200", () => {
    it("resolves with 200 when endpoint returns 200", async () => {
      fetch.mockResolvedValueOnce({ status: 200 });

      const promise = waitFor200("http://localhost:3000");
      jest.advanceTimersByTime(1000);
      await Promise.resolve();
      await Promise.resolve();

      const result = await promise;
      expect(result).toBe(200);
      expect(fetch).toHaveBeenCalledWith("http://localhost:3000");
    });

    it("retries when endpoint returns non-200", async () => {
      fetch
        .mockResolvedValueOnce({ status: 500 })
        .mockResolvedValueOnce({ status: 200 });

      const promise = waitFor200("http://localhost:3000");

      jest.advanceTimersByTime(1000);
      await Promise.resolve();
      await Promise.resolve();

      jest.advanceTimersByTime(1000);
      await Promise.resolve();
      await Promise.resolve();

      const result = await promise;
      expect(result).toBe(200);
      expect(fetch).toHaveBeenCalledTimes(2);
    });

    it("handles fetch errors and continues retrying", async () => {
      fetch
        .mockRejectedValueOnce(new Error("ECONNREFUSED"))
        .mockResolvedValueOnce({ status: 200 });

      const promise = waitFor200("http://localhost:3000");

      jest.advanceTimersByTime(1000);
      await Promise.resolve();
      await Promise.resolve();
      await Promise.resolve();

      jest.advanceTimersByTime(1000);
      await Promise.resolve();
      await Promise.resolve();

      const result = await promise;
      expect(result).toBe(200);
    });

    it("accepts URL object and converts to string", async () => {
      fetch.mockResolvedValueOnce({ status: 200 });

      const url = new URL("http://localhost:3000/health");
      const promise = waitFor200(url);

      jest.advanceTimersByTime(1000);
      await Promise.resolve();
      await Promise.resolve();

      const result = await promise;
      expect(result).toBe(200);
      expect(fetch).toHaveBeenCalledWith("http://localhost:3000/health");
    });

    it("logs the URL being waited for", async () => {
      fetch.mockResolvedValueOnce({ status: 200 });

      const promise = waitFor200("http://localhost:3000");
      jest.advanceTimersByTime(1000);
      await Promise.resolve();
      await Promise.resolve();

      await promise;
      expect(console.log).toHaveBeenCalledWith(
        "waiting for",
        "http://localhost:3000"
      );
    });
  });

  describe("checkEndpoint", () => {
    it("delegates to waitFor200", async () => {
      fetch.mockResolvedValueOnce({ status: 200 });

      const promise = checkEndpoint("http://localhost:3000");
      jest.advanceTimersByTime(1000);
      await Promise.resolve();
      await Promise.resolve();

      const result = await promise;
      expect(result).toBe(200);
    });
  });

  describe("verifyEndpoint", () => {
    it("delegates to waitFor200 and awaits result", async () => {
      fetch.mockResolvedValueOnce({ status: 200 });

      const promise = verifyEndpoint("http://localhost:3000");
      jest.advanceTimersByTime(1000);
      await Promise.resolve();
      await Promise.resolve();

      const result = await promise;
      expect(result).toBe(200);
    });
  });
});
