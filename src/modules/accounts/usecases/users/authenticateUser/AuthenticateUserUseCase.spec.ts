import { ApplicationError } from "../../../../../errors/ApplicationError";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { User } from "../../../entities/User";
import { UserRepositoryInMemory } from "../../../repositories/users/in-memory/UserRepositoryInMemory";
import { PasswordHandler } from "../../../utils/cryptography/implementations/PasswordHandler";
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
});