jest.mock('@sentry/node');

import { validateUserPermissions } from '../sentry';

describe('validateUserPermissions', () => {
  const sensitiveResource = { type: 'sensitive', owner: 'user1' };
  const normalResource = { type: 'normal', owner: 'user1' };
  const prodContext = { environment: 'production' };
  const devContext = { environment: 'development' };

  describe('when user is null/undefined', () => {
    it('should return false for null user', () => {
      expect(validateUserPermissions(null, sensitiveResource, 'read', prodContext)).toBe(false);
    });

    it('should return false for undefined user', () => {
      expect(validateUserPermissions(undefined, sensitiveResource, 'read', prodContext)).toBe(false);
    });
  });

  describe('admin role', () => {
    const admin = { role: 'admin', mfaEnabled: true, lastLogin: Date.now() - 1000, id: 'admin1' };

    describe('with sensitive resource', () => {
      describe('delete action', () => {
        it('should allow in production with MFA and recent login', () => {
          const user = { ...admin, mfaEnabled: true, lastLogin: Date.now() - 1000 };
          expect(validateUserPermissions(user, sensitiveResource, 'delete', prodContext)).toBe(true);
        });

        it('should deny in production with MFA but stale login', () => {
          const user = { ...admin, mfaEnabled: true, lastLogin: Date.now() - 4000000 };
          expect(validateUserPermissions(user, sensitiveResource, 'delete', prodContext)).toBe(false);
        });

        it('should deny in production with MFA but no lastLogin', () => {
          const user = { ...admin, mfaEnabled: true, lastLogin: null };
          expect(validateUserPermissions(user, sensitiveResource, 'delete', prodContext)).toBe(false);
        });

        it('should deny in production without MFA', () => {
          const user = { ...admin, mfaEnabled: false };
          expect(validateUserPermissions(user, sensitiveResource, 'delete', prodContext)).toBe(false);
        });

        it('should allow in non-production environment', () => {
          expect(validateUserPermissions(admin, sensitiveResource, 'delete', devContext)).toBe(true);
        });
      });

      describe('read action', () => {
        it('should allow admin to read sensitive resource', () => {
          expect(validateUserPermissions(admin, sensitiveResource, 'read', prodContext)).toBe(true);
        });
      });

      describe('write action', () => {
        it('should allow with MFA enabled', () => {
          const user = { ...admin, mfaEnabled: true };
          expect(validateUserPermissions(user, sensitiveResource, 'write', prodContext)).toBe(true);
        });

        it('should deny without MFA', () => {
          const user = { ...admin, mfaEnabled: false };
          expect(validateUserPermissions(user, sensitiveResource, 'write', prodContext)).toBe(false);
        });
      });

      describe('unknown action', () => {
        it('should deny unknown actions on sensitive resources', () => {
          expect(validateUserPermissions(admin, sensitiveResource, 'execute', prodContext)).toBe(false);
        });
      });
    });

    describe('with non-sensitive resource', () => {
      it('should allow any action on normal resources', () => {
        expect(validateUserPermissions(admin, normalResource, 'delete', prodContext)).toBe(true);
        expect(validateUserPermissions(admin, normalResource, 'read', prodContext)).toBe(true);
        expect(validateUserPermissions(admin, normalResource, 'write', prodContext)).toBe(true);
      });
    });
  });

  describe('moderator role', () => {
    const moderator = { role: 'moderator', id: 'mod1' };

    it('should deny access to sensitive resources', () => {
      expect(validateUserPermissions(moderator, sensitiveResource, 'read', prodContext)).toBe(false);
    });

    it('should deny delete on normal resources', () => {
      expect(validateUserPermissions(moderator, normalResource, 'delete', prodContext)).toBe(false);
    });

    it('should allow read on normal resources', () => {
      expect(validateUserPermissions(moderator, normalResource, 'read', prodContext)).toBe(true);
    });

    it('should allow write on normal resources', () => {
      expect(validateUserPermissions(moderator, normalResource, 'write', prodContext)).toBe(true);
    });
  });

  describe('user role', () => {
    const user = { role: 'user', id: 'user1' };

    it('should allow read on owned resources', () => {
      const ownedResource = { type: 'normal', owner: 'user1' };
      expect(validateUserPermissions(user, ownedResource, 'read', prodContext)).toBe(true);
    });

    it('should deny read on non-owned resources', () => {
      const otherResource = { type: 'normal', owner: 'user2' };
      expect(validateUserPermissions(user, otherResource, 'read', prodContext)).toBe(false);
    });

    it('should deny write action', () => {
      expect(validateUserPermissions(user, normalResource, 'write', prodContext)).toBe(false);
    });

    it('should deny delete action', () => {
      expect(validateUserPermissions(user, normalResource, 'delete', prodContext)).toBe(false);
    });
  });

  describe('unknown role', () => {
    it('should deny access for unknown roles', () => {
      const unknownUser = { role: 'guest', id: 'guest1' };
      expect(validateUserPermissions(unknownUser, normalResource, 'read', prodContext)).toBe(false);
    });
  });
});
