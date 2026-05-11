jest.mock("pusher-js");

const Pusher = require("pusher-js");

describe("pusher service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("creates a Pusher instance with the correct key", () => {
    jest.isolateModules(() => {
      require("../pusher.js");
    });
    expect(Pusher).toHaveBeenCalledWith("edfjk5ffe67926a756t9", {
      channelAuthorization: {
        endpoint: "/authenticate",
        transport: "ajax",
      },
    });
  });

  it("passes the correct API key as first argument", () => {
    jest.isolateModules(() => {
      require("../pusher.js");
    });
    const callArgs = Pusher.mock.calls[0];
    expect(callArgs[0]).toBe("edfjk5ffe67926a756t9");
  });

  it("configures channel authorization with /authenticate endpoint", () => {
    jest.isolateModules(() => {
      require("../pusher.js");
    });
    const callArgs = Pusher.mock.calls[0];
    expect(callArgs[1].channelAuthorization.endpoint).toBe("/authenticate");
  });

  it("configures channel authorization with ajax transport", () => {
    jest.isolateModules(() => {
      require("../pusher.js");
    });
    const callArgs = Pusher.mock.calls[0];
    expect(callArgs[1].channelAuthorization.transport).toBe("ajax");
  });
});
