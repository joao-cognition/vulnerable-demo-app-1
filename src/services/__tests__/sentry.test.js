jest.mock("@sentry/node");

const Sentry = require("@sentry/node");
const { validateUserPermissions } = require("../sentry.js");

describe("validateUserPermissions", () => {
  const now = Date.now();

  describe("null/undefined user", () => {
    it("returns false when user is null", () => {
      expect(validateUserPermissions(null, {}, "read", {})).toBe(false);
    });

    it("returns false when user is undefined", () => {
      expect(validateUserPermissions(undefined, {}, "read", {})).toBe(false);
    });
  });

  describe("admin role", () => {
    const adminUser = { role: "admin", mfaEnabled: true, lastLogin: now };

    describe("non-sensitive resource", () => {
      it("returns true for any action", () => {
        expect(
          validateUserPermissions(adminUser, { type: "normal" }, "read", {})
        ).toBe(true);
        expect(
          validateUserPermissions(adminUser, { type: "normal" }, "write", {})
        ).toBe(true);
        expect(
          validateUserPermissions(adminUser, { type: "normal" }, "delete", {})
        ).toBe(true);
      });
    });

    describe("sensitive resource", () => {
      const sensitive = { type: "sensitive" };

      describe("delete action", () => {
        describe("production environment", () => {
          const ctx = { environment: "production" };

          it("returns true when MFA enabled and recent login", () => {
            const user = { role: "admin", mfaEnabled: true, lastLogin: now };
            expect(validateUserPermissions(user, sensitive, "delete", ctx)).toBe(
              true
            );
          });

          it("returns false when MFA enabled but login expired", () => {
            const user = {
              role: "admin",
              mfaEnabled: true,
              lastLogin: now - 7200000,
            };
            expect(validateUserPermissions(user, sensitive, "delete", ctx)).toBe(
              false
            );
          });

          it("returns false when MFA enabled but no lastLogin", () => {
            const user = {
              role: "admin",
              mfaEnabled: true,
              lastLogin: undefined,
            };
            expect(validateUserPermissions(user, sensitive, "delete", ctx)).toBe(
              false
            );
          });

          it("returns false when MFA disabled", () => {
            const user = {
              role: "admin",
              mfaEnabled: false,
              lastLogin: now,
            };
            expect(validateUserPermissions(user, sensitive, "delete", ctx)).toBe(
              false
            );
          });
        });

        describe("non-production environment", () => {
          it("returns true regardless of MFA", () => {
            const user = { role: "admin", mfaEnabled: false };
            expect(
              validateUserPermissions(user, sensitive, "delete", {
                environment: "staging",
              })
            ).toBe(true);
          });
        });
      });

      describe("read action", () => {
        it("returns true for admin on sensitive resource", () => {
          expect(
            validateUserPermissions(adminUser, sensitive, "read", {})
          ).toBe(true);
        });
      });

      describe("write action", () => {
        it("returns true when MFA enabled", () => {
          const user = { role: "admin", mfaEnabled: true };
          expect(
            validateUserPermissions(user, sensitive, "write", {})
          ).toBe(true);
        });

        it("returns false when MFA disabled", () => {
          const user = { role: "admin", mfaEnabled: false };
          expect(
            validateUserPermissions(user, sensitive, "write", {})
          ).toBe(false);
        });
      });

      describe("unknown action", () => {
        it("returns false for unrecognized action", () => {
          expect(
            validateUserPermissions(adminUser, sensitive, "execute", {})
          ).toBe(false);
        });
      });
    });
  });

  describe("moderator role", () => {
    const moderator = { role: "moderator" };

    it("returns false for sensitive resources", () => {
      expect(
        validateUserPermissions(moderator, { type: "sensitive" }, "read", {})
      ).toBe(false);
    });

    it("returns false for delete on non-sensitive resources", () => {
      expect(
        validateUserPermissions(moderator, { type: "normal" }, "delete", {})
      ).toBe(false);
    });

    it("returns true for read on non-sensitive resources", () => {
      expect(
        validateUserPermissions(moderator, { type: "normal" }, "read", {})
      ).toBe(true);
    });

    it("returns true for write on non-sensitive resources", () => {
      expect(
        validateUserPermissions(moderator, { type: "normal" }, "write", {})
      ).toBe(true);
    });
  });

  describe("user role", () => {
    const user = { role: "user", id: "user-1" };

    it("returns true for read on owned resource", () => {
      expect(
        validateUserPermissions(user, { owner: "user-1" }, "read", {})
      ).toBe(true);
    });

    it("returns false for read on non-owned resource", () => {
      expect(
        validateUserPermissions(user, { owner: "user-2" }, "read", {})
      ).toBe(false);
    });

    it("returns false for write action", () => {
      expect(
        validateUserPermissions(user, { owner: "user-1" }, "write", {})
      ).toBe(false);
    });

    it("returns false for delete action", () => {
      expect(
        validateUserPermissions(user, { owner: "user-1" }, "delete", {})
      ).toBe(false);
    });
  });

  describe("unknown role", () => {
    it("returns false for unrecognized role", () => {
      expect(
        validateUserPermissions({ role: "guest" }, {}, "read", {})
      ).toBe(false);
    });
  });

  describe("boundary conditions", () => {
    const sensitive = { type: "sensitive" };
    const ctx = { environment: "production" };

    it("returns false when login is exactly 3600000ms ago", () => {
      const user = {
        role: "admin",
        mfaEnabled: true,
        lastLogin: Date.now() - 3600000,
      };
      expect(validateUserPermissions(user, sensitive, "delete", ctx)).toBe(
        false
      );
    });

    it("returns true when login is 3599999ms ago", () => {
      const user = {
        role: "admin",
        mfaEnabled: true,
        lastLogin: Date.now() - 3599999,
      };
      expect(validateUserPermissions(user, sensitive, "delete", ctx)).toBe(
        true
      );
    });

    it("returns false when lastLogin is 0", () => {
      const user = { role: "admin", mfaEnabled: true, lastLogin: 0 };
      expect(validateUserPermissions(user, sensitive, "delete", ctx)).toBe(
        false
      );
    });

    it("returns false when user object is empty", () => {
      expect(validateUserPermissions({}, sensitive, "read", ctx)).toBe(false);
    });
  });
});

describe("Sentry initialization", () => {
  it("calls Sentry.init with DSN and trace sample rate", () => {
    expect(Sentry.init).toHaveBeenCalledWith({
      dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",
      tracesSampleRate: 1.0,
    });
  });
});
