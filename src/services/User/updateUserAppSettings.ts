import { Container } from "../service.types";
import errors from "../../errors";

const makeUpdateUserAppSettings = (container: Container) => {
  const { db, currentUser } = container;

  return async (req: any) => {
    const { appId } = req.params;
    const userId = currentUser.id;
    const where = { appId, userId };
    const settings = req.body;
    let appSettings;

    await db.transaction(async (transaction: any) => {
      const appPassword = await db.UserAppPassword.findOne({
        where,
        transaction,
      });

      if (!appPassword) {
        throw errors.users.USER_APP_NO_ACCESS;
      }

      appSettings = await db.UserAppSetting.findOne({ where, transaction });

      if (!appSettings) {
        const payload = { ...where, settings };

        appSettings = await db.UserAppSetting.create(payload, { transaction });
      } else {
        await appSettings.update({ settings }, { where, transaction });

        await appSettings.reload({ transaction });
      }
    });

    /* @ts-ignore */
    return appSettings.serialize();
  };
};

export default makeUpdateUserAppSettings;
