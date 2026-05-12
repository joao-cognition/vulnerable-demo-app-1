jest.mock("@sentry/node", () => ({ init: jest.fn() }), { virtual: true });

const { validateUserPermissions } = require("../sentry.js");

describe("validateUserPermissions", () => {
  describe("no user provided", () => {
    it("should return false when user is null", () => {
      expect(validateUserPermissions(null, {}, "read", {})).toBe(false);
    });

    it("should return false when user is undefined", () => {
      expect(validateUserPermissions(undefined, {}, "read", {})).toBe(false);
    });
  });

  describe("unknown role", () => {
    it("should return false for an unrecognized role", () => {
      const user = { role: "guest" };
      expect(validateUserPermissions(user, {}, "read", {})).toBe(false);
    });
  });

  describe("admin role", () => {
    const admin = (overrides = {}) => ({
      role: "admin",
      mfaEnabled: true,
      lastLogin: Date.now(),
      ...overrides,
    });

    describe("non-sensitive resource", () => {
      it("should return true for any action on a non-sensitive resource", () => {
        expect(
          validateUserPermissions(admin(), { type: "normal" }, "read", {})
        ).toBe(true);
      });
    });

    describe("sensitive resource — read action", () => {
      it("should return true", () => {
        expect(
          validateUserPermissions(admin(), { type: "sensitive" }, "read", {})
        ).toBe(true);
      });
    });

    describe("sensitive resource — write action", () => {
      it("should return true when MFA is enabled", () => {
        expect(
          validateUserPermissions(
            admin({ mfaEnabled: true }),
            { type: "sensitive" },
            "write",
            {}
          )
        ).toBe(true);
      });

      it("should return false when MFA is disabled", () => {
        expect(
          validateUserPermissions(
            admin({ mfaEnabled: false }),
            { type: "sensitive" },
            "write",
            {}
          )
        ).toBe(false);
      });
    });

    describe("sensitive resource — delete action", () => {
      it("should return true in non-production environment", () => {
        expect(
          validateUserPermissions(
            admin(),
            { type: "sensitive" },
            "delete",
            { environment: "staging" }
          )
        ).toBe(true);
      });

      describe("production environment", () => {
        it("should return true when MFA enabled and login within 1 hour", () => {
          expect(
            validateUserPermissions(
              admin({ mfaEnabled: true, lastLogin: Date.now() - 1000 }),
              { type: "sensitive" },
              "delete",
              { environment: "production" }
            )
          ).toBe(true);
        });

        it("should return false when MFA enabled but login expired", () => {
          expect(
            validateUserPermissions(
              admin({
                mfaEnabled: true,
                lastLogin: Date.now() - 4000000,
              }),
              { type: "sensitive" },
              "delete",
              { environment: "production" }
            )
          ).toBe(false);
        });

        it("should return false when MFA enabled but no lastLogin", () => {
          expect(
            validateUserPermissions(
              admin({ mfaEnabled: true, lastLogin: null }),
              { type: "sensitive" },
              "delete",
              { environment: "production" }
            )
          ).toBe(false);
        });

        it("should return false when MFA is disabled", () => {
          expect(
            validateUserPermissions(
              admin({ mfaEnabled: false }),
              { type: "sensitive" },
              "delete",
              { environment: "production" }
            )
          ).toBe(false);
        });
      });
    });

    describe("sensitive resource — unknown action", () => {
      it("should return false for unrecognized actions", () => {
        expect(
          validateUserPermissions(
            admin(),
            { type: "sensitive" },
            "execute",
            {}
          )
        ).toBe(false);
      });
    });
  });

  describe("moderator role", () => {
    const moderator = { role: "moderator" };

    it("should return false for sensitive resources", () => {
      expect(
        validateUserPermissions(moderator, { type: "sensitive" }, "read", {})
      ).toBe(false);
    });

    it("should return false for delete on non-sensitive resources", () => {
      expect(
        validateUserPermissions(moderator, { type: "normal" }, "delete", {})
      ).toBe(false);
    });

    it("should return true for read on non-sensitive resources", () => {
      expect(
        validateUserPermissions(moderator, { type: "normal" }, "read", {})
      ).toBe(true);
    });

    it("should return true for write on non-sensitive resources", () => {
      expect(
        validateUserPermissions(moderator, { type: "normal" }, "write", {})
      ).toBe(true);
    });
  });

  describe("user role", () => {
    const user = { role: "user", id: "user-1" };

    it("should return true for read on owned resource", () => {
      expect(
        validateUserPermissions(user, { owner: "user-1" }, "read", {})
      ).toBe(true);
    });

    it("should return false for read on non-owned resource", () => {
      expect(
        validateUserPermissions(user, { owner: "user-2" }, "read", {})
      ).toBe(false);
    });

    it("should return false for write action", () => {
      expect(
        validateUserPermissions(user, { owner: "user-1" }, "write", {})
      ).toBe(false);
    });

    it("should return false for delete action", () => {
      expect(
        validateUserPermissions(user, { owner: "user-1" }, "delete", {})
      ).toBe(false);
    });
  });
});
