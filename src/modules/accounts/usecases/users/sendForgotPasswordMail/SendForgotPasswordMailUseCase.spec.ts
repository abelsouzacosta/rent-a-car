import { UserTokenRepositoryInMemory } from "@modules/accounts/repositories/users_tokens/implemetations/UsersTokenRepositoryInMemory";
import { UserRepositoryInMemory } from "@modules/accounts/repositories/users/in-memory/UserRepositoryInMemory";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { ApplicationError } from "@shared/errors/ApplicationError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let repository: UserRepositoryInMemory;
let userTokenRepository: UserTokenRepositoryInMemory;
let dateProvider: DayJsDateProvider;
let mailProvider: MailProviderInMemory;

describe("Send forgot password mail use case", () => {
  beforeEach(() => {
    repository = new UserRepositoryInMemory();
    userTokenRepository = new UserTokenRepositoryInMemory();
    dateProvider = new DayJsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      repository,
      userTokenRepository,
      dateProvider,
      mailProvider
    );
  });

  it("Should be able to sent a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await repository.create({
      name: "Mason Simpson",
      email: "op@sovovil.ee",
      password: "1553",
      driver_license: "23932",
    });

    await sendForgotPasswordMailUseCase.execute({ email: "op@sovovil.ee" });

    expect(sendMail).toHaveBeenCalled();
  });

  it("Should throw an error if the user provided does not exists", () => {
    expect(async () => {
      await sendForgotPasswordMailUseCase.execute({ email: "noki@ka.vu" });
    }).rejects.toThrow(ApplicationError);
  });
});
