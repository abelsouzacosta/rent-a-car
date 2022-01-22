import {
  IUserRepository,
  ICreateUserDTO,
} from "@modules/accounts/repositories/users/IUserRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateUserUseCase {
  private repository: IUserRepository;

  constructor(
    @inject("UserRepository")
    repository: IUserRepository
  ) {
    this.repository = repository;
  }

  async execute({
    name,
    username,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const usernameAlreadyTaken = await this.repository.findByUsername(username);
    const emailAlreadyTaken = await this.repository.findByEmail(email);

    if (usernameAlreadyTaken) throw new Error("Username already taken");

    if (emailAlreadyTaken) throw new Error("Email already taken");

    await this.repository.create({
      name,
      username,
      password,
      email,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
