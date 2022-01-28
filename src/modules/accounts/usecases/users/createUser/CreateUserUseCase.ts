import {
  IUserRepository,
  ICreateUserDTO,
} from "@modules/accounts/repositories/users/IUserRepository";
import { IPasswordHandler } from "@modules/accounts/utils/cryptography/password/IPasswordHandler";
import { inject, injectable } from "tsyringe";

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

    if (emailAlreadyTaken) throw new Error("Email already taken");

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