const describeServiceMethod = require("../../../testUtils/describeServiceMethod");

describeServiceMethod(
  "services/Authentication/getToken",
  (getToken, { _setContainer }) => {
    _setContainer({
      currentUser: {
        email: "test@email.com",
        firstName: "John",
        lastName: "Smith",
        id: 1,
      },
      userSettings: {},
    });

    const req = { params: {} };

    const result = getToken(req);

    it("returns secret and jwtPayload", () => {
      expect(result).toHaveProperty("token");
      expect(result).toHaveProperty("jwtPayload");
    });
  }
);
