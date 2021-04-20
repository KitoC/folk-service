type TryCatchMethod = (req: any, res: any, next: any) => any[];
type TryCatchMiddleWareWrapper = (method: TryCatchMethod) => () => void;

const tryCatch: TryCatchMiddleWareWrapper = (method: TryCatchMethod) => async (
  ...args: any[]
) => {
  const [req, res, next] = args;

  try {
    const results = await method(req, res, next);

    next(...results);
  } catch (error) {
    next(error);
  }
};

export default tryCatch;
