import { Container } from "../service.types";
import errors from "../../errors";

const makeFindOne = (container: Container) => {
  const { db } = container;

  return (options: any = {}) => {
    const attributes = db.User.getDecryptedAttributes();

    return db.User.findOne({ attributes, ...options });
  };
};

export default makeFindOne;
