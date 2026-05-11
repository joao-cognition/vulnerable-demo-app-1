jest.mock('pusher-js', () => {
  return jest.fn().mockImplementation((key, options) => ({
    key,
    options,
  }));
}, { virtual: true });

import Pusher from 'pusher-js';

describe('pusher service', () => {
  it('creates a Pusher instance with the expected config', async () => {
    const pusherModule = await import('../pusher.js');
    const instance = pusherModule.default;

    expect(Pusher).toHaveBeenCalledWith('edfjk5ffe67926a756t9', {
      channelAuthorization: {
        endpoint: '/authenticate',
        transport: 'ajax',
      },
    });
    expect(instance).toBeDefined();
    expect(instance.key).toBe('edfjk5ffe67926a756t9');
  });
});
