const { JWT_SECRET } = process.env;

export default (appId: string) => {
  console.log(appId ? `${JWT_SECRET}${appId}` : JWT_SECRET);
  return appId ? `${JWT_SECRET}${appId}` : JWT_SECRET;
};
