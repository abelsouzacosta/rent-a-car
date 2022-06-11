import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UserTokenRepositoryInMemory } from "@modules/accounts/repositories/users_tokens/implemetations/UsersTokenRepositoryInMemory";
import { UserRepositoryInMemory } from "@modules/accounts/repositories/users/in-memory/UserRepositoryInMemory";
import { PasswordHandler } from "@modules/accounts/utils/cryptography/implementations/PasswordHandler";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";

import { AuthenticateUserUseCase } from "../authenticateUser/AuthenticateUserUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

describe("RefreshToken Use Case", () => {
  let repository: UserRepositoryInMemory;
  let userTokenRepository: UserTokenRepositoryInMemory;
  let dateProvider: IDateProvider;
  let refresh: RefreshTokenUseCase;
  let handler: PasswordHandler;
  let create: CreateUserUseCase;
  let auth: AuthenticateUserUseCase;

  beforeAll(() => {
    repository = new UserRepositoryInMemory();
    userTokenRepository = new UserTokenRepositoryInMemory();
    dateProvider = new DayJsDateProvider();
    handler = new PasswordHandler();
    create = new CreateUserUseCase(repository, handler);
    auth = new AuthenticateUserUseCase(
      repository,
      handler,
      userTokenRepository,
      dateProvider
    );
    refresh = new RefreshTokenUseCase(
      userTokenRepository,
      repository,
      dateProvider
    );
  });

  describe("Success case", () => {
    it("should return 2 jwt tokens if valid credentials are given", async () => {
      const user: ICreateUserDTO = {
        name: "test",
        email: "test@test.com",
        password: "123456",
        driver_license: "909090",
      };

      await create.execute(user);

      const { refresh_token } = await auth.execute({
        email: user.email,
        password: user.password,
      });

      const result = await refresh.execute({ token: refresh_token });

      expect(result).toHaveProperty("refresh_token");
      expect(result).toHaveProperty("newToken");
    });
  });
});
