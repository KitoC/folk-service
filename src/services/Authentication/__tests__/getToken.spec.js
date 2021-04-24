describe("services/Authentication/getToken", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  process.env.JWT_SECRET = "secret";
  process.env.JWT_ALGORITHM = "HS256";
  process.env.JWT_EXPIRY = "6h";

  const makeGetToken = require("../getToken").default;

  const container = {
    currentUser: {
      email: "test@email.com",
      firstName: "John",
      lastName: "Smith",
      id: 1,
    },
    userSettings: {},
  };

  const getToken = makeGetToken(container);

  const req = { params: {} };

  const result = getToken(req);

  it("returns secret and jwtPayload", () => {
    expect(result).toHaveProperty("token");
    expect(result).toHaveProperty("jwtPayload");
  });
});
