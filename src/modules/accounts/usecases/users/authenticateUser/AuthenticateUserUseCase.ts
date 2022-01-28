import { IUserRepository } from "@modules/accounts/repositories/users/IUserRepository";
import { IPasswordHandler } from "@modules/accounts/utils/cryptography/password/IPasswordHandler";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

interface IAuthenticateUserDTO {
  email: string;
  password: string;
}

interface IUserDTO {
  name: string;
  email: string;
}

interface IResponse {
  user: IUserDTO;
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  private repository: IUserRepository;
  private passwordHandler: IPasswordHandler;

  constructor(
    @inject("UserRepository")
    repository: IUserRepository,
    @inject("PasswordHandler")
    passwordHandler: IPasswordHandler
  ) {
    this.repository = repository;
    this.passwordHandler = passwordHandler;
  }

  async execute({ email, password }: IAuthenticateUserDTO): Promise<IResponse> {
    const user = await this.repository.findByEmail(email);

    if (!user) throw new Error("Email or password incorrect");

    const passwordMatch = await this.passwordHandler.passwordCompare(
      password,
      user.password
    );

    if (!passwordMatch) throw new Error("Email or password incorrect");

    const token = sign({}, "907e7177676d8efa02a19f29ceeaf81d", {
      subject: user.id,
      expiresIn: 86400,
    });

    const response: IResponse = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };

    return response;
  }
}

export { AuthenticateUserUseCase };
