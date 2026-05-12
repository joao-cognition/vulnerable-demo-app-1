jest.mock("pusher-js", () => {
  return jest.fn().mockImplementation((key, options) => ({
    key,
    options,
    subscribe: jest.fn(),
    unsubscribe: jest.fn(),
  }));
}, { virtual: true });

import Pusher from "pusher-js";

describe("pusher service", () => {
  it("should create a Pusher instance with the correct key", async () => {
    const mod = await import("../pusher.js");
    const instance = mod.default;

    expect(Pusher).toHaveBeenCalledWith("edfjk5ffe67926a756t9", {
      channelAuthorization: {
        endpoint: "/authenticate",
        transport: "ajax",
      },
    });
  });

  it("should configure channel authorization with ajax transport", async () => {
    expect(Pusher).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        channelAuthorization: expect.objectContaining({
          endpoint: "/authenticate",
          transport: "ajax",
        }),
      })
    );
  });
});
