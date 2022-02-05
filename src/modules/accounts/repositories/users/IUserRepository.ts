import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUpdateUserAvatarDTO } from "../../dtos/IUpdateUserAvatarDTO";
import { IUpdateUserDTO } from "../../dtos/IUpdateUserDTO";
import { User } from "../../entities/User";

interface IUserRepository {
  findByName(name: string): Promise<User | undefined>;

  findByEmail(email: string): Promise<User | undefined>;

  findById(id: string): Promise<User | undefined>;

  list(): Promise<User[]>;

  create({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void>;

  update({
    id,
    name,
    email,
    password,
    driver_license,
  }: IUpdateUserDTO): Promise<void>;

  updateAvatar({ id, avatar }: IUpdateUserAvatarDTO): Promise<void>;

  delete(id: string): Promise<void>;
}

export { IUserRepository };
