jest.mock('pusher-js', () => {
  return jest.fn().mockImplementation((key, options) => ({
    key,
    options,
    subscribe: jest.fn(),
    unsubscribe: jest.fn(),
  }));
});

import Pusher from 'pusher-js';
import pusherInstance from '../pusher';

describe('Pusher service', () => {
  it('should create a Pusher instance with the configured key', () => {
    expect(Pusher).toHaveBeenCalledWith('edfjk5ffe67926a756t9', {
      channelAuthorization: {
        endpoint: '/authenticate',
        transport: 'ajax',
      },
    });
  });

  it('should export a Pusher instance', () => {
    expect(pusherInstance).toBeDefined();
    expect(pusherInstance.key).toBe('edfjk5ffe67926a756t9');
  });

  it('should configure channel authorization with ajax transport', () => {
    expect(pusherInstance.options).toEqual({
      channelAuthorization: {
        endpoint: '/authenticate',
        transport: 'ajax',
      },
    });
  });
});
