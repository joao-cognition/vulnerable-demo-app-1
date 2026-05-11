const Pusher = jest.fn().mockImplementation((key, options) => ({
  key,
  channelAuthorization: options ? options.channelAuthorization : undefined,
  subscribe: jest.fn(),
  unsubscribe: jest.fn(),
  disconnect: jest.fn(),
}));

module.exports = Pusher;
module.exports.default = Pusher;
