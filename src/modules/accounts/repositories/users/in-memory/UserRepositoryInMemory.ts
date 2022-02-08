import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUpdateUserAvatarDTO } from "../../../dtos/IUpdateUserAvatarDTO";
import { IUpdateUserDTO } from "../../../dtos/IUpdateUserDTO";
import { User } from "../../../entities/User";
import { IUserRepository } from "../IUserRepository";

class UserRepositoryInMemory implements IUserRepository {
  public users: User[];

  constructor() {
    this.users = [];
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);

    return user;
  }

  async findByName(name: string): Promise<User> {
    const user = this.users.find((user) => user.name === name);

    return user;
  }

  async create({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, { name, email, password, driver_license });

    this.users.push(user);
  }

  async list(): Promise<User[]> {
    return this.users;
  }

  async update({
    id,
    name,
    email,
    password,
    driver_license,
  }: IUpdateUserDTO): Promise<void> {
    const user = await this.findById(id);

    user.name = name;
    user.email = email;
    user.password = password;
    user.driver_license = driver_license;
  }

  async delete(id: string): Promise<void> {
    const user = await this.findById(id);

    const index = this.users.indexOf(user);

    this.users.splice(index, 1);
  }

  async updateAvatar({ id, avatar }: IUpdateUserAvatarDTO): Promise<void> {
    const user = await this.findById(id);

    user.avatar = avatar;
  }
}

export { UserRepositoryInMemory };
