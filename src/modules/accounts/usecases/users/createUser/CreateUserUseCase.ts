import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUserRepository } from "@modules/accounts/repositories/users/IUserRepository";
import { IPasswordHandler } from "@modules/accounts/utils/cryptography/password/IPasswordHandler";
import { ApplicationError } from "@shared/errors/ApplicationError";

@injectable()
class CreateUserUseCase {
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
    name,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const emailAlreadyTaken = await this.repository.findByEmail(email);

    if (emailAlreadyTaken)
      throw new ApplicationError("Email already taken", 409);

    const passwordHashed = await this.passwordHandler.passwordHash(password, 8);

    await this.repository.create({
      name,
      password: passwordHashed,
      email,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
