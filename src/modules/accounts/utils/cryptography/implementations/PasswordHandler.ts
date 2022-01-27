import { compare, hash } from "bcrypt";

import { IPasswordHandler } from "../password/IPasswordHandler";

class PasswordHandler implements IPasswordHandler {
  async passwordCompare(password: string, hash: string): Promise<boolean> {
    const passwordIsValid = await compare(password, hash);

    return passwordIsValid;
  }

  async passwordHash(password: string, rounds: number): Promise<string> {
    const hashedPassword = await hash(password, rounds);

    return hashedPassword;
  }
}

export { PasswordHandler };
