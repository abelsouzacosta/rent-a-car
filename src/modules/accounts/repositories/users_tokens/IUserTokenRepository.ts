import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserToken } from "@modules/accounts/infra/typeorm/entities/UserToken";

interface IUserTokenRepository {
  findById(id: string): Promise<UserToken>;

  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken>;

  findByToken(token: string): Promise<UserToken>;

  create({
    refresh_token,
    user_id,
    expires_date,
  }: ICreateUserTokenDTO): Promise<UserToken>;

  delete(id: string): Promise<void>;
}

export { IUserTokenRepository };
