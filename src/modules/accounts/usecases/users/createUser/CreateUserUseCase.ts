import {
  IUserRepository,
  ICreateUserDTO,
} from "@modules/accounts/repositories/users/IUserRepository";
import { hash } from "bcrypt";
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

    const passwordHashed = await hash(password, 8);

    await this.repository.create({
      name,
      password: passwordHashed,
      email,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
