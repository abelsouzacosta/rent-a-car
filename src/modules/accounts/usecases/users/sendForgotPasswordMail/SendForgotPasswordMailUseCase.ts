import { inject, injectable } from "tsyringe";
import { v4 as uuidv4 } from "uuid";

import { ISendForgotPasswordDTO } from "@modules/accounts/dtos/ISendForgotPasswordMailDTO";
import { IUserTokenRepository } from "@modules/accounts/repositories/users_tokens/IUserTokenRepository";
import { IUserRepository } from "@modules/accounts/repositories/users/IUserRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { ApplicationError } from "@shared/errors/ApplicationError";

@injectable()
class SendForgotPasswordMailUseCase {
  private repository: IUserRepository;
  private userTokenRepository: IUserTokenRepository;
  private dateProvider: IDateProvider;

  constructor(
    @inject("UserRepository")
    repository: IUserRepository,
    @inject("UserTokenRepository")
    userTokenRepository: IUserTokenRepository,
    @inject("DateProvider")
    dateProvider: IDateProvider
  ) {
    Object.assign(this, { repository, userTokenRepository, dateProvider });
  }

  async execute({ email }: ISendForgotPasswordDTO): Promise<void> {
    const user = await this.repository.findByEmail(email);

    if (!user) throw new ApplicationError("User not found", 404);

    const token = uuidv4();

    const expires_date = this.dateProvider.addHours(3);

    await this.userTokenRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    });
  }
}

export { SendForgotPasswordMailUseCase };
