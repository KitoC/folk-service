export default (req: any) => {
  const { originalUrl } = req;
  const { appId } = req.params;

  const userAppEndpoints = [`/v1/auth/${appId}`, `/v1/my-account`];

  return userAppEndpoints.includes(req.baseUrl);
};
