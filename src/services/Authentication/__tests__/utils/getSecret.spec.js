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

  const makeReq = (endpoint = "/") => ({
    params: { appId },
    ...rest,
  });

  [
    {
      describeText: "when visiting a route with /v1/auth/:appId",
      expected: "secret-app-id",
      endpoint: `/v1/auth/app-id`,
    },
    {
      describeText: "when visiting a route with /v1/my-account",
      expected: "secret-app-id",
      endpoint: `/v1/my-account`,
    },
    {
      describeText:
        "when visiting a route with /v1/organizations/foo/apps/:appId",
      expected: "secret",
      endpoint: `/v1/organizations/foo/apps/app-id`,
    },
  ].forEach((testCase) => {
    const { describeText, expected, endpoint } = testCase;

    describe(describeText, () => {
      const req = { baseUrl: endpoint, params: { appId: "app-id" } };
      const result = getSecret(req);

      it(`returns ${expected}`, () => {
        expect(result).toEqual(expected);
      });
    });
  });
});
