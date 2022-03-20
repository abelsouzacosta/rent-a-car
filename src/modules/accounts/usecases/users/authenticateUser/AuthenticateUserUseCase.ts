import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IAuthenticateUserDTO } from "@modules/accounts/dtos/IAuthenticateUserDTO";
import { IResponseAuthenticationDTO } from "@modules/accounts/dtos/IResponseAuthenticationDTO";
import { IUserTokenRepository } from "@modules/accounts/repositories/users_tokens/IUserTokenRepository";
import { IUserRepository } from "@modules/accounts/repositories/users/IUserRepository";
import { IPasswordHandler } from "@modules/accounts/utils/cryptography/password/IPasswordHandler";
import { ApplicationError } from "@shared/errors/ApplicationError";

@injectable()
class AuthenticateUserUseCase {
  private repository: IUserRepository;
  private userTokenRepository: IUserTokenRepository;
  private passwordHandler: IPasswordHandler;

  constructor(
    @inject("UserRepository")
    repository: IUserRepository,
    @inject("PasswordHandler")
    passwordHandler: IPasswordHandler,
    @inject("UserTokenRepository")
    userTokenRepository: IUserTokenRepository
  ) {
    Object.assign(this, { repository, passwordHandler, userTokenRepository });
  }

  async execute({
    email,
    password,
  }: IAuthenticateUserDTO): Promise<IResponseAuthenticationDTO> {
    if (!email) throw new ApplicationError("Email not provided", 400);

    if (!password) throw new ApplicationError("Password not provided", 400);

    const user = await this.repository.findByEmail(email);

    if (!user) throw new ApplicationError("Email or password incorrect", 401);

    const passwordMatch = await this.passwordHandler.passwordCompare(
      password,
      user.password
    );

    if (!passwordMatch)
      throw new ApplicationError("Email or password incorrect", 401);

    const token = sign({}, auth.secret_token, {
      subject: user.id,
      expiresIn: auth.expires_in_token,
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
