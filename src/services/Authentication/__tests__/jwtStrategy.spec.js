const describeServiceMethod = require("../../../testUtils/describeServiceMethod");

describeServiceMethod(
  "services/Authentication/jwtStrategy",
  (jwtStrategy, { container }) => {
    const user1 = container.db.User.build({
      id: 1,
      appId: "app-id",
      userId: 1,
      settings: {},
    });

    container.db.User.$queueResult(user1);

    const req = { params: {} };
    const jwtPayload = { id: 1 };
    const next = jest.fn((err, secret) => [err, secret]);

    it("calls next with null, user as parameters", async () => {
      await jwtStrategy(req, jwtPayload, next);

      expect(next.mock.calls.length).toBe(1);
      expect(next.mock.calls[0][0]).toBe(null);
      expect(next.mock.calls[0][1]).toBe(user1);
    });
  }
);
