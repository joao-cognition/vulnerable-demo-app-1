jest.mock("@sentry/node", () => ({
  init: jest.fn(),
}), { virtual: true });

import { validateUserPermissions } from "../sentry.js";

describe("validateUserPermissions", () => {
  const sensitiveResource = { type: "sensitive", owner: "user-1" };
  const normalResource = { type: "normal", owner: "user-1" };
  const prodContext = { environment: "production" };
  const devContext = { environment: "development" };

  describe("when user is null/undefined", () => {
    it("should return false for null user", () => {
      expect(validateUserPermissions(null, sensitiveResource, "read", prodContext)).toBe(false);
    });

    it("should return false for undefined user", () => {
      expect(validateUserPermissions(undefined, sensitiveResource, "read", prodContext)).toBe(false);
    });
  });

  describe("admin role", () => {
    const adminBase = { role: "admin", mfaEnabled: true, lastLogin: Date.now() };

    describe("non-sensitive resource", () => {
      it("should allow any action", () => {
        expect(validateUserPermissions(adminBase, normalResource, "read", prodContext)).toBe(true);
        expect(validateUserPermissions(adminBase, normalResource, "write", prodContext)).toBe(true);
        expect(validateUserPermissions(adminBase, normalResource, "delete", prodContext)).toBe(true);
      });
    });

    describe("sensitive resource — delete in production", () => {
      it("should allow when MFA enabled and recent login", () => {
        const user = { ...adminBase, mfaEnabled: true, lastLogin: Date.now() };
        expect(validateUserPermissions(user, sensitiveResource, "delete", prodContext)).toBe(true);
      });

      it("should deny when login is stale (>1 hour)", () => {
        const user = { ...adminBase, mfaEnabled: true, lastLogin: Date.now() - 7200000 };
        expect(validateUserPermissions(user, sensitiveResource, "delete", prodContext)).toBe(false);
      });

      it("should deny when lastLogin is null", () => {
        const user = { ...adminBase, mfaEnabled: true, lastLogin: null };
        expect(validateUserPermissions(user, sensitiveResource, "delete", prodContext)).toBe(false);
      });

      it("should deny when MFA is disabled", () => {
        const user = { ...adminBase, mfaEnabled: false };
        expect(validateUserPermissions(user, sensitiveResource, "delete", prodContext)).toBe(false);
      });
    });

    describe("sensitive resource — delete in non-production", () => {
      it("should allow regardless of MFA or login time", () => {
        const user = { ...adminBase, mfaEnabled: false };
        expect(validateUserPermissions(user, sensitiveResource, "delete", devContext)).toBe(true);
      });
    });

    describe("sensitive resource — read", () => {
      it("should allow read for admin", () => {
        expect(validateUserPermissions(adminBase, sensitiveResource, "read", prodContext)).toBe(true);
      });
    });

    describe("sensitive resource — write", () => {
      it("should allow when MFA is enabled", () => {
        const user = { ...adminBase, mfaEnabled: true };
        expect(validateUserPermissions(user, sensitiveResource, "write", prodContext)).toBe(true);
      });

      it("should deny when MFA is disabled", () => {
        const user = { ...adminBase, mfaEnabled: false };
        expect(validateUserPermissions(user, sensitiveResource, "write", prodContext)).toBe(false);
      });
    });

    describe("sensitive resource — unknown action", () => {
      it("should deny unknown actions", () => {
        expect(validateUserPermissions(adminBase, sensitiveResource, "execute", prodContext)).toBe(false);
      });
    });
  });

  describe("moderator role", () => {
    const moderator = { role: "moderator" };

    it("should deny access to sensitive resources", () => {
      expect(validateUserPermissions(moderator, sensitiveResource, "read", prodContext)).toBe(false);
    });

    it("should allow read on normal resources", () => {
      expect(validateUserPermissions(moderator, normalResource, "read", prodContext)).toBe(true);
    });

    it("should allow write on normal resources", () => {
      expect(validateUserPermissions(moderator, normalResource, "write", prodContext)).toBe(true);
    });

    it("should deny delete on normal resources", () => {
      expect(validateUserPermissions(moderator, normalResource, "delete", prodContext)).toBe(false);
    });
  });

  describe("user role", () => {
    const user = { role: "user", id: "user-1" };

    it("should allow read on owned resources", () => {
      expect(validateUserPermissions(user, { type: "normal", owner: "user-1" }, "read", prodContext)).toBe(true);
    });

    it("should deny read on non-owned resources", () => {
      expect(validateUserPermissions(user, { type: "normal", owner: "user-2" }, "read", prodContext)).toBe(false);
    });

    it("should deny write", () => {
      expect(validateUserPermissions(user, { type: "normal", owner: "user-1" }, "write", prodContext)).toBe(false);
    });

    it("should deny delete", () => {
      expect(validateUserPermissions(user, { type: "normal", owner: "user-1" }, "delete", prodContext)).toBe(false);
    });
  });

  describe("unknown role", () => {
    it("should deny access for unknown roles", () => {
      const user = { role: "guest" };
      expect(validateUserPermissions(user, normalResource, "read", prodContext)).toBe(false);
    });
  });
});
