const makeUpdateUserAppSettings = require("../updateUserAppSettings").default;
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
// db.UserAppSetting.$queueResult(userAppSetting1);

describe("services/User/updateUserAppSettings", () => {
  describe("when currentUser has access to app", () => {
    const req = {
      params: { appId: "app-id" },
      body: { withUpdatedSettings: true },
    };
    const container = { db, currentUser: { id: 1 } };
    const updateUserAppSettings = makeUpdateUserAppSettings(container);

    it("updates the app settings record", async () => {
      const before = await db.UserAppSetting.findOne({
        where: { ...req.params },
      });
      const expected = { settings: { withUpdatedSettings: true } };

      expect(before.dataValues.settings).toEqual({});

      const result = await updateUserAppSettings(req);

      console.log("result --> ", result.dataValues);
      console.log("expected --> ", expected.dataValues);

      expect(result.dataValues.settings).toEqual(expected.settings);
    });
  });

  describe("when currentUser does not have access to app", () => {
    const req = { params: { appId: "app-id" } };
    const container = { db, currentUser: { id: 2 } };
    const updateUserAppSettings = makeUpdateUserAppSettings(container);

    it("throws an error", async () => {
      const expected = errors.users.USER_APP_NO_ACCESS;

      try {
        await updateUserAppSettings(req);
      } catch (err) {
        expect(err).toEqual(expected);
      }
    });
  });
});
