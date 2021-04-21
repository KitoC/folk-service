import { Container } from "../service.types";
import errors from "../../errors";

const makeGetUserAppSettings = (container: Container) => {
  const { db, currentUser } = container;

  return async (req: any) => {
    const { appId } = req.params;
    const userId = currentUser.id;

    const appSettings = await db.UserAppSetting.findOne({
      where: { appId, userId },
    });

    if (!appSettings) {
      throw errors.users.USER_APP_NO_ACCESS;
    }

    return appSettings;
  };
};

export default makeGetUserAppSettings;
