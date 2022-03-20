import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IAuthenticateUserDTO } from "@modules/accounts/dtos/IAuthenticateUserDTO";
import { IResponseAuthenticationDTO } from "@modules/accounts/dtos/IResponseAuthenticationDTO";
import { IUserTokenRepository } from "@modules/accounts/repositories/users_tokens/IUserTokenRepository";
import { IUserRepository } from "@modules/accounts/repositories/users/IUserRepository";
import { IPasswordHandler } from "@modules/accounts/utils/cryptography/password/IPasswordHandler";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { ApplicationError } from "@shared/errors/ApplicationError";

@injectable()
class AuthenticateUserUseCase {
  private repository: IUserRepository;
  private userTokenRepository: IUserTokenRepository;
  private passwordHandler: IPasswordHandler;
  private dateProvider: IDateProvider;

  constructor(
    @inject("UserRepository")
    repository: IUserRepository,
    @inject("PasswordHandler")
    passwordHandler: IPasswordHandler,
    @inject("UserTokenRepository")
    userTokenRepository: IUserTokenRepository,
    @inject("DateProvider")
    dateProvider: IDateProvider
  ) {
    Object.assign(this, {
      repository,
      passwordHandler,
      userTokenRepository,
      dateProvider,
    });
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

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user.id,
      expiresIn: auth.expires_in_refresh_token,
    });

    const refresh_token_expires_date = this.dateProvider.addDays(
      auth.expires_refresh_token_days
    );

    await this.userTokenRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refresh_token_expires_date,
    });

    const response: IResponseAuthenticationDTO = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
      refresh_token,
    };

    return response;
  }
}

export { AuthenticateUserUseCase };
