import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "@modules/accounts/repositories/users/in-memory/UserRepositoryInMemory";
import { PasswordHandler } from "@modules/accounts/utils/cryptography/implementations/PasswordHandler";
import { ApplicationError } from "@shared/errors/ApplicationError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let repository: UserRepositoryInMemory;
let handler: PasswordHandler;
let auth: AuthenticateUserUseCase;
let create: CreateUserUseCase;

describe("Authenticate User Use Case", () => {
  beforeEach(() => {
    repository = new UserRepositoryInMemory();
    handler = new PasswordHandler();
    create = new CreateUserUseCase(repository, handler);
    auth = new AuthenticateUserUseCase(repository, handler);
  });

  it("Should throw an exception if an email is not provided", async () => {
    const result = auth.execute({
      email: "",
      password: "123456",
    });

    await expect(result).rejects.toThrowError(
      new ApplicationError("Email not provided", 400)
    );
  });

  it("Should throw an execption if an password is not provided", async () => {
    const result = auth.execute({
      email: "abelsouzacosta@gmail.com",
      password: "",
    });

    await expect(result).rejects.toThrowError(
      new ApplicationError("Password not provided", 400)
    );
  });

  it("Should be able to authenticate an user in the application", async () => {
    const user: ICreateUserDTO = {
      name: "Abel",
      email: "abelsouzacosta@gmail.com",
      password: "123456",
      driver_license: "909090",
    };

    await create.execute(user);

    const result = await auth.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("Should not be able to authenticate the user if the email is incorrect", async () => {
    const user: ICreateUserDTO = {
      name: "Abel",
      email: "abelsouzacosta@gmail.com",
      password: "123456",
      driver_license: "909090",
    };

    await create.execute(user);

    const result = auth.execute({
      email: "another@mail.com",
      password: user.password,
    });

    await expect(result).rejects.toThrowError(
      new ApplicationError("Email or password incorrect", 401)
    );
  });

  it("Should not be able to authenticate the user if the password is incorrect", async () => {
    const user: ICreateUserDTO = {
      name: "Abel",
      email: "abelsouzacosta@gmail.com",
      password: "123456",
      driver_license: "909090",
    };

    await create.execute(user);

    const result = auth.execute({
      email: user.email,
      password: "anotherPass",
    });

    await expect(result).rejects.toThrowError(
      new ApplicationError("Email or password incorrect", 401)
    );
  });
});
