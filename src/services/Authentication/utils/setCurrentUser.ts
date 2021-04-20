import * as awilix from "awilix";

const setCurrentUser = (res: any, { user, settings }: any) => {
  res.locals.container.register({
    currentUser: awilix.asValue(user),
    userSettings: awilix.asValue(settings),
  });
};

export default setCurrentUser;
