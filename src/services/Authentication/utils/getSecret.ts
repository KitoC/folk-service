const { JWT_SECRET } = process.env;

export default (appId: string) => {
  return appId ? `${JWT_SECRET}${appId}` : JWT_SECRET;
};
