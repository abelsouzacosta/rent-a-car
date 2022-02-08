import { ApplicationError } from "../../../../../errors/ApplicationError";
import { UserRepositoryInMemory } from "../../../repositories/users/in-memory/UserRepositoryInMemory";
import { PasswordHandler } from "../../../utils/cryptography/implementations/PasswordHandler";
import { CreateUserUseCase } from "./CreateUserUseCase";

let create: CreateUserUseCase;
let repository: UserRepositoryInMemory;
let handler: PasswordHandler;

describe("Create User Use Case", () => {
  beforeEach(() => {
    repository = new UserRepositoryInMemory();
    handler = new PasswordHandler();
    create = new CreateUserUseCase(repository, handler);
  });

  it("Should be able to create an instance of user", async () => {
    const user = {
      name: "Abel Souza",
      email: "abelsouzacosta@gmail.com",
      password: "123456",
      driver_license: "9099090",
    };

    await create.execute({
      name: user.name,
      email: user.email,
      password: user.password,
      driver_license: user.driver_license,
    });

    const created = await repository.findByName(user.name);

    expect(created).toHaveProperty("id");
  });

  it("Should not be able to create an user with an email already taken", async () => {
    expect(async () => {
      const user = {
        name: "Abel Souza",
        email: "abelsouzacosta@gmail.com",
        password: "123456",
        driver_license: "9099090",
      };

      await create.execute({
        name: user.name,
        email: user.email,
        password: user.password,
        driver_license: user.driver_license,
      });

      await create.execute({
        name: user.name,
        email: user.email,
        password: user.password,
        driver_license: user.driver_license,
      });
    }).rejects.toBeInstanceOf(ApplicationError);
  });
});
