const describeServiceMethod = require("../../../testUtils/describeServiceMethod");

describeServiceMethod(
  "services/Authentication/secretProvider",
  (secretProvider) => {
    describe("when params contains appId", () => {
      const req = { params: { appId: "app-id" } };
      const rawJwtToken = "dawdfawf";
      const done = jest.fn((err, secret) => [err, secret]);

      secretProvider(req, rawJwtToken, done);

      it("calls done with null, secret as parameters", () => {
        expect(done.mock.calls.length).toBe(1);
        expect(done.mock.calls[0][0]).toBe(null);
        expect(done.mock.calls[0][1]).toBe("secret");
      });
    });
  }
);
