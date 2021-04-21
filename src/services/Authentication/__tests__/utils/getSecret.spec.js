describe("services/Authentication/getSecret", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  process.env.JWT_SECRET = "secret";

  const getSecret = require("../../utils/getSecret").default;

  describe("when provided appId", () => {
    const result = getSecret("app-id");

    it("appends the appId to secret", () => {
      expect(result).toEqual("secretapp-id");
    });
  });

  describe("when not provided appId", () => {
    const result = getSecret();

    it("returns only secret", () => {
      expect(result).toEqual("secret");
    });
  });
});
