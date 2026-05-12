const Pusher = jest.fn().mockImplementation((key, options) => ({
  key,
  options,
  subscribe: jest.fn(),
  unsubscribe: jest.fn(),
}));

export default Pusher;
