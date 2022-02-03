import { IUserDTO } from "./IUserDTO";

interface IResponseAuthenticationDTO {
  user: IUserDTO;
  token: string;
}

export { IResponseAuthenticationDTO };
