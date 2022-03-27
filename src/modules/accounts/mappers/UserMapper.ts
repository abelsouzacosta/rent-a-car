import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";

class UserMapper {
  static toDTO({
    id,
    name,
    email,
    avatar,
    driver_license,
  }: User): IUserResponseDTO {
    return {
      id,
      name,
      email,
      avatar,
      driver_license,
    };
  }
}

export { UserMapper };
