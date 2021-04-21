const makeGetUserAppSettings = require("../getUserAppSettings").default;
const errors = require("../../../errors").default;

const UserAppSetting = {
  repository: [{ id: 1, appId: "app-id", userId: 1, settings: {} }],
  findOne({ where }) {
    return this.repository.find(
      ({ userId, appId }) => where.userId === userId && where.appId === appId
    );
  },
};
const db = {
  UserAppSetting,
};

describe("services/User/getUserAppSettings", () => {
  describe("when currentUser has access to app", () => {
    const req = { params: { appId: "app-id" } };
    const container = { db, currentUser: { id: 1 } };
    const getUserAppSettings = makeGetUserAppSettings(container);

    it("returns the app settings record", async () => {
      const expected = UserAppSetting.repository[0];
      const result = await getUserAppSettings(req);

      expect(result).toEqual(expected);
    });
  });

  describe("when currentUser does not have access to app", () => {
    const req = { params: { appId: "app-id" } };
    const container = { db, currentUser: { id: 2 } };
    const getUserAppSettings = makeGetUserAppSettings(container);

    it("throws an error", async () => {
      const expected = errors.users.USER_APP_NO_ACCESS;

      try {
        await getUserAppSettings(req);
      } catch (err) {
        expect(err).toEqual(expected);
      }
    });
  });
});
