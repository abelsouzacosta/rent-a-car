import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IRefreshTokenDTO } from "@modules/accounts/dtos/IRefreshTokenDTO";
import { IUserTokenRepository } from "@modules/accounts/repositories/users_tokens/IUserTokenRepository";
import { IUserRepository } from "@modules/accounts/repositories/users/IUserRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { ApplicationError } from "@shared/errors/ApplicationError";

interface IPayload {
  sub: string;
  email: string;
}

type ITokenResponse = {
  refresh_token: string;
  newToken: string;
};

@injectable()
class RefreshTokenUseCase {
  private repository: IUserTokenRepository;
  private userRepository: IUserRepository;
  private dateProvider: IDateProvider;

  constructor(
    @inject("UserTokenRepository")
    repository: IUserRepository,
    @inject("UserRepository")
    userRepository: IUserRepository,
    @inject("DateProvider")
    dateProvider: IDateProvider
  ) {
    Object.assign(this, { repository, userRepository, dateProvider });
  }

  async execute({ token }: IRefreshTokenDTO): Promise<ITokenResponse> {
    const decode = verify(token, auth.secret_refresh_token) as IPayload;

    const { sub: user_id, email } = decode;

    const user = await this.userRepository.findById(user_id);

    if (!user) throw new ApplicationError("User not found", 401);

    const userTokenExists = await this.repository.findByUserIdAndRefreshToken(
      user_id,
      token
    );

    if (!userTokenExists)
      throw new ApplicationError("User refresh token not found", 404);

    await this.repository.delete(userTokenExists.id);

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user.id,
      expiresIn: auth.expires_in_refresh_token,
    });

    const expires_date = this.dateProvider.addDays(
      auth.expires_refresh_token_days
    );

    await this.repository.create({
      user_id: user.id,
      refresh_token,
      expires_date,
    });

    const newToken = sign({}, auth.secret_token, {
      subject: user.id,
      expiresIn: auth.expires_in_token,
    });

    return {
      refresh_token,
      newToken,
    };
  }
}

export { RefreshTokenUseCase };
