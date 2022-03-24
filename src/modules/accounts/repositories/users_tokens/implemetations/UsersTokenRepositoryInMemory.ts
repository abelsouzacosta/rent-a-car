import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserToken } from "@modules/accounts/infra/typeorm/entities/UserToken";

import { IUserTokenRepository } from "../IUserTokenRepository";

class UserTokenRepositoryInMemory implements IUserTokenRepository {
  private usersToken: UserToken[];

  constructor() {
    this.usersToken = [];
  }

  async create({
    refresh_token,
    user_id,
    expires_date,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      refresh_token,
      user_id,
      expires_date,
    });

    this.usersToken.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken> {
    const userToken = this.usersToken.find(
      (userToken) =>
        userToken.user_id === user_id &&
        userToken.refresh_token === refresh_token
    );

    return userToken;
  }

  async findById(id: string): Promise<UserToken> {
    const userToken = this.usersToken.find((userToken) => userToken.id === id);

    return userToken;
  }

  async findByToken(token: string): Promise<UserToken> {
    const userToken = this.usersToken.find(
      (userToken) => userToken.refresh_token === token
    );

    return userToken;
  }

  async delete(id: string): Promise<void> {
    const userToken = await this.findById(id);

    const indexOfUserToken = this.usersToken.indexOf(userToken);

    this.usersToken.splice(indexOfUserToken, 1);
  }
}

export { UserTokenRepositoryInMemory };
