const Sentry = {
  init: jest.fn(),
  captureException: jest.fn(),
  captureMessage: jest.fn(),
  configureScope: jest.fn(),
};

module.exports = Sentry;
module.exports.default = Sentry;
