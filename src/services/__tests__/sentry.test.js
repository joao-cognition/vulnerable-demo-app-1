jest.mock('@sentry/node', () => ({
  init: jest.fn(),
}), { virtual: true });

import { validateUserPermissions } from '../sentry.js';

describe('validateUserPermissions', () => {
  const NOW = 1700000000000;

  beforeEach(() => {
    jest.spyOn(Date, 'now').mockReturnValue(NOW);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns false when user is null', () => {
    expect(validateUserPermissions(null, {}, 'read', {})).toBe(false);
  });

  it('returns false when user is undefined', () => {
    expect(validateUserPermissions(undefined, {}, 'read', {})).toBe(false);
  });

  describe('admin role', () => {
    const admin = { role: 'admin', mfaEnabled: true, lastLogin: NOW - 1000 };

    it('returns true for non-sensitive resource', () => {
      expect(validateUserPermissions(admin, { type: 'public' }, 'read', {})).toBe(true);
    });

    describe('sensitive resource', () => {
      const sensitive = { type: 'sensitive' };

      describe('delete action', () => {
        it('returns true in non-production environment', () => {
          expect(
            validateUserPermissions(admin, sensitive, 'delete', { environment: 'staging' })
          ).toBe(true);
        });

        it('returns true in production with MFA and recent login', () => {
          expect(
            validateUserPermissions(admin, sensitive, 'delete', { environment: 'production' })
          ).toBe(true);
        });

        it('returns false in production with MFA but expired login', () => {
          const expiredAdmin = { ...admin, lastLogin: NOW - 7200000 };
          expect(
            validateUserPermissions(expiredAdmin, sensitive, 'delete', { environment: 'production' })
          ).toBe(false);
        });

        it('returns false in production with MFA but no lastLogin', () => {
          const noLoginAdmin = { role: 'admin', mfaEnabled: true };
          expect(
            validateUserPermissions(noLoginAdmin, sensitive, 'delete', { environment: 'production' })
          ).toBe(false);
        });

        it('returns false in production without MFA', () => {
          const noMfaAdmin = { role: 'admin', mfaEnabled: false };
          expect(
            validateUserPermissions(noMfaAdmin, sensitive, 'delete', { environment: 'production' })
          ).toBe(false);
        });
      });

      it('returns true for read action', () => {
        expect(validateUserPermissions(admin, sensitive, 'read', {})).toBe(true);
      });

      it('returns true for write action with MFA', () => {
        expect(validateUserPermissions(admin, sensitive, 'write', {})).toBe(true);
      });

      it('returns false for write action without MFA', () => {
        const noMfa = { role: 'admin', mfaEnabled: false };
        expect(validateUserPermissions(noMfa, sensitive, 'write', {})).toBe(false);
      });

      it('returns false for unknown action', () => {
        expect(validateUserPermissions(admin, sensitive, 'execute', {})).toBe(false);
      });
    });
  });

  describe('moderator role', () => {
    const moderator = { role: 'moderator' };

    it('returns false for sensitive resource', () => {
      expect(validateUserPermissions(moderator, { type: 'sensitive' }, 'read', {})).toBe(false);
    });

    it('returns false for delete action on non-sensitive resource', () => {
      expect(validateUserPermissions(moderator, { type: 'public' }, 'delete', {})).toBe(false);
    });

    it('returns true for read action on non-sensitive resource', () => {
      expect(validateUserPermissions(moderator, { type: 'public' }, 'read', {})).toBe(true);
    });

    it('returns true for write action on non-sensitive resource', () => {
      expect(validateUserPermissions(moderator, { type: 'public' }, 'write', {})).toBe(true);
    });
  });

  describe('user role', () => {
    const user = { role: 'user', id: 'user-1' };

    it('returns true for read action on owned resource', () => {
      expect(validateUserPermissions(user, { owner: 'user-1' }, 'read', {})).toBe(true);
    });

    it('returns false for read action on non-owned resource', () => {
      expect(validateUserPermissions(user, { owner: 'user-2' }, 'read', {})).toBe(false);
    });

    it('returns false for write action', () => {
      expect(validateUserPermissions(user, { owner: 'user-1' }, 'write', {})).toBe(false);
    });

    it('returns false for delete action', () => {
      expect(validateUserPermissions(user, { owner: 'user-1' }, 'delete', {})).toBe(false);
    });
  });

  describe('unknown role', () => {
    it('returns false for any action', () => {
      const guest = { role: 'guest' };
      expect(validateUserPermissions(guest, {}, 'read', {})).toBe(false);
    });
  });
});
