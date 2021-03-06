import { getRepository, Repository } from "typeorm";

import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUserTokenRepository } from "@modules/accounts/repositories/users_tokens/IUserTokenRepository";

import { UserToken } from "../entities/UserToken";

class UserTokenRepository implements IUserTokenRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }

  async findById(id: string): Promise<UserToken> {
    const token = await this.repository.findOne({
      where: {
        id,
      },
    });

    return token;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken> {
    const token = await this.repository.findOne({
      where: {
        user_id,
        refresh_token,
      },
    });

    return token;
  }

  async findByToken(token: string): Promise<UserToken> {
    const refresh_token = await this.repository.findOne({
      where: {
        refresh_token: token,
      },
    });

    return refresh_token;
  }

  async create({
    refresh_token,
    user_id,
    expires_date,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const token = this.repository.create({
      refresh_token,
      user_id,
      expires_date,
    });

    await this.repository.save(token);

    return token;
  }

  async delete(id: string): Promise<void> {
    const refresh_token = await this.repository.findOne({
      where: {
        id,
      },
    });

    await this.repository.remove(refresh_token);
  }
}

export { UserTokenRepository };
