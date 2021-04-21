const makeGetUserAppSettings = require("../getUserAppSettings").default;
const errors = require("../../../errors").default;
const dbLoader = require("../../../loaders/db").default;

const db = dbLoader({});

const userAppSetting1 = db.UserAppSetting.build({
  id: 1,
  appId: "app-id",
  userId: 1,
  settings: {},
});

db.UserAppSetting.$queueResult(userAppSetting1);
db.UserAppSetting.$queueResult(userAppSetting1);

describe("services/User/getUserAppSettings", () => {
  describe("when currentUser has access to app", () => {
    const req = { params: { appId: "app-id" } };
    const container = { db, currentUser: { id: 1 } };
    const getUserAppSettings = makeGetUserAppSettings(container);

    it("returns the app settings record", async () => {
      const expected = await db.UserAppSetting.findOne({
        where: { ...req.params },
      });
      const result = await getUserAppSettings(req);

      expect(result.dataValues).toEqual(expected.dataValues);
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
