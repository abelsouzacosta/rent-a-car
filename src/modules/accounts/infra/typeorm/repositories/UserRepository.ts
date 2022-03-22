import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUpdateUserAvatarDTO } from "@modules/accounts/dtos/IUpdateUserAvatarDTO";
import { IUpdateUserDTO } from "@modules/accounts/dtos/IUpdateUserDTO";
import { IUserPasswordResetDTO } from "@modules/accounts/dtos/IUserPasswordResetDTO";
import { IUserRepository } from "@modules/accounts/repositories/users/IUserRepository";

import { User } from "../entities/User";

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

  async updateAvatar({ id, avatar }: IUpdateUserAvatarDTO): Promise<void> {
    const user = await this.findById(id);

    user.avatar = avatar;

    await this.repository.save(user);
  }

  async updatePassword({ id, password }: IUserPasswordResetDTO): Promise<void> {
    const user = await this.findById(id);

    user.password = password;

    await this.repository.save(user);
  }

  async delete(id: string): Promise<void> {
    const user = await this.findById(id);

    await this.repository.remove(user);
  }
}

export { UserRepository };
