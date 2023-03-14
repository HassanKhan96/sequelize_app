import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  try {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  } catch (error) {
    return error;
  }
};

export const verifyPassword = async (password: string, hash: string) => {
  try {
    const isValidPassword = await bcrypt.compare(password, hash);
    if (!isValidPassword) throw new Error();
    return true;
  } catch (error) {
    return error;
  }
};
