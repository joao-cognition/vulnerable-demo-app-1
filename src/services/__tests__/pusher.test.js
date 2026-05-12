const MockPusher = jest.fn().mockImplementation((key, options) => ({
  key,
  options,
  subscribe: jest.fn(),
  unsubscribe: jest.fn(),
}));
jest.mock("pusher-js", () => MockPusher, { virtual: true });

let pusherInstance;
beforeAll(async () => {
  const mod = await import("../pusher.js");
  pusherInstance = mod.default;
});

describe("pusher service", () => {
  it("should create a Pusher instance with the correct key and config", () => {

    expect(MockPusher).toHaveBeenCalledWith("edfjk5ffe67926a756t9", {
      channelAuthorization: {
        endpoint: "/authenticate",
        transport: "ajax",
      },
    });

    expect(pusherInstance).toBeDefined();
    expect(pusherInstance.key).toBe("edfjk5ffe67926a756t9");
  });

  it("should configure channel authorization with ajax transport", () => {
    const call = MockPusher.mock.calls[0];
    expect(call[1].channelAuthorization.transport).toBe("ajax");
    expect(call[1].channelAuthorization.endpoint).toBe("/authenticate");
  });
});
