import { User } from "@modules/accounts/entities/User";
import { getRepository, Repository } from "typeorm";

import {
  IUserRepository,
  ICreateUserDTO,
  IUpdateUserDTO,
} from "../users/IUserRepository";

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      password,
      email,
      driver_license,
    });

    await this.repository.save(user);
  }

  async list(): Promise<User[]> {
    const users = await this.repository.find();

    return users;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  async findByName(name: string): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        name,
      },
    });

    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        username,
      },
    });

    return user;
  }

  async update({
    id,
    name,
    email,
    password,
    driver_license,
  }: IUpdateUserDTO): Promise<void> {
    const user = await this.findById(id);

    user.name = name || user.name;
    user.password = password || user.password;
    user.email = email || user.email;
    user.driver_license = driver_license || user.driver_license;

    await this.repository.save(user);
  }

  async delete(id: string): Promise<void> {
    const user = await this.findById(id);

    await this.repository.remove(user);
  }
}

export { UserRepository };