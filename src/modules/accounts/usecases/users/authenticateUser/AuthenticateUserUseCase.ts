import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { ApplicationError } from "../../../../../errors/ApplicationError";
import { IAuthenticateUserDTO } from "../../../dtos/IAuthenticateUserDTO";
import { IResponseAuthenticationDTO } from "../../../dtos/IResponseAuthenticationDTO";
import { IUserRepository } from "../../../repositories/users/IUserRepository";
import { IPasswordHandler } from "../../../utils/cryptography/password/IPasswordHandler";

@injectable()
class AuthenticateUserUseCase {
  private repository: IUserRepository;
  private passwordHandler: IPasswordHandler;

  constructor(
    @inject("UserRepository")
    repository: IUserRepository,
    @inject("PasswordHandler")
    passwordHandler: IPasswordHandler
  ) {
    this.repository = repository;
    this.passwordHandler = passwordHandler;
  }

  async execute({
    email,
    password,
  }: IAuthenticateUserDTO): Promise<IResponseAuthenticationDTO> {
    const user = await this.repository.findByEmail(email);

    if (!user) throw new ApplicationError("Email or password incorrect", 401);

    const passwordMatch = await this.passwordHandler.passwordCompare(
      password,
      user.password
    );

    if (!passwordMatch)
      throw new ApplicationError("Email or password incorrect", 401);

    const token = sign({}, "907e7177676d8efa02a19f29ceeaf81d", {
      subject: user.id,
      expiresIn: 86400,
    });

    const response: IResponseAuthenticationDTO = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };

    return response;
  }
}

export { AuthenticateUserUseCase };
