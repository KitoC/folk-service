import isAppJwt from "./isAppJwt";

export default (req: any) => {
  const { JWT_SECRET } = process.env;

  const { appId } = req.params;

  let secret = JWT_SECRET;

  if (appId && isAppJwt(req)) {
    secret += `-${appId}`;
  }

  return secret;
};
