import isAppJwt from "./isAppJwt";
const { JWT_SECRET } = process.env;

export default (req: any) => {
  const { appId } = req.params;

  let secret = JWT_SECRET;

  if (appId && isAppJwt(req)) {
    secret += `-${appId}`;
  }

  return secret;
};
