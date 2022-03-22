import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { IResetPasswordDTO } from "@modules/accounts/dtos/IResetPasswordDTO";
import { IUserTokenRepository } from "@modules/accounts/repositories/users_tokens/IUserTokenRepository";
import { IUserRepository } from "@modules/accounts/repositories/users/IUserRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { ApplicationError } from "@shared/errors/ApplicationError";

@injectable()
class ResetPasswordUserUseCase {
  private userRepository: IUserRepository;
  private repository: IUserTokenRepository;
  private dateProvider: IDateProvider;

  constructor(
    @inject("UserTokenRepository")
    repository: IUserTokenRepository,
    @inject("UserRepository")
    userRepository: IUserRepository,
    @inject("DateProvider")
    dateProvider: IDateProvider
  ) {
    Object.assign(this, { repository, userRepository, dateProvider });
  }

  async execute({ token, password }: IResetPasswordDTO): Promise<void> {
    const foundToken = await this.repository.findByToken(token);

    if (!foundToken) throw new ApplicationError("Invalid Token", 400);

    const user = await this.userRepository.findById(foundToken.user_id);

    if (!user) throw new ApplicationError("User not found", 404);

    const dateNow = this.dateProvider.dateNow();

    const expireTokenDate = foundToken.expires_date;

    const isValidToken = this.dateProvider.compareIfBefore(
      dateNow,
      expireTokenDate
    );

    console.log(isValidToken);

    if (!isValidToken) throw new ApplicationError("Invalid Token", 400);

    const hashedPassword = await hash(password, 10);

    await this.userRepository.updatePassword({
      id: user.id,
      password: hashedPassword,
    });

    await this.repository.delete(foundToken.id);
  }
}

export { ResetPasswordUserUseCase };
