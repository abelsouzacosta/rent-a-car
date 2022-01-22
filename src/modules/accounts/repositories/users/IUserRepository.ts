import { User } from "@modules/accounts/entities/User";

interface ICreateUserDTO {
  name: string;
  username: string;
  password: string;
  email: string;
  driver_license: string;
}

interface IUpdateUserDTO extends ICreateUserDTO {
  id: string;
}

interface IUserRepository {
  findByName(name: string): Promise<User | undefined>;

  findByUsername(username: string): Promise<User | undefined>;

  findByEmail(email: string): Promise<User | undefined>;

  findById(id: string): Promise<User | undefined>;

  list(): Promise<User[]>;

  create({
    name,
    username,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<void>;

  update({
    id,
    name,
    username,
    password,
    email,
    driver_license,
  }: IUpdateUserDTO): Promise<void>;

  delete(id: string): Promise<void>;
}

export { IUserRepository, ICreateUserDTO, IUpdateUserDTO };
