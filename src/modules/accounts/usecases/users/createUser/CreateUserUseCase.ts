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
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const emailAlreadyTaken = await this.repository.findByEmail(email);

    if (emailAlreadyTaken) throw new Error("Email already taken");

    await this.repository.create({
      name,
      password,
      email,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
