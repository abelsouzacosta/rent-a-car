import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuidv4 } from "uuid";

import { ISendForgotPasswordDTO } from "@modules/accounts/dtos/ISendForgotPasswordMailDTO";
import { IUserTokenRepository } from "@modules/accounts/repositories/users_tokens/IUserTokenRepository";
import { IUserRepository } from "@modules/accounts/repositories/users/IUserRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { ApplicationError } from "@shared/errors/ApplicationError";

@injectable()
class SendForgotPasswordMailUseCase {
  private repository: IUserRepository;
  private userTokenRepository: IUserTokenRepository;
  private dateProvider: IDateProvider;
  private mailProvider: IMailProvider;

  constructor(
    @inject("UserRepository")
    repository: IUserRepository,
    @inject("UserTokenRepository")
    userTokenRepository: IUserTokenRepository,
    @inject("DateProvider")
    dateProvider: IDateProvider,
    @inject("MailProvider")
    mailProvider: IMailProvider
  ) {
    Object.assign(this, {
      repository,
      userTokenRepository,
      dateProvider,
      mailProvider,
    });
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

    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "..",
      "views",
      "email",
      "forgotPassword.hbs"
    );

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    };

    await this.mailProvider.sendMail(
      email,
      "Recuperação de senha",
      variables,
      templatePath
    );
  }
}

export { SendForgotPasswordMailUseCase };
