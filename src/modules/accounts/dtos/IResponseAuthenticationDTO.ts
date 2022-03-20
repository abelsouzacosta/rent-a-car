import { IUserDTO } from "./IUserDTO";

interface IResponseAuthenticationDTO {
  user: IUserDTO;
  token: string;
  refresh_token: string;
}

export { IResponseAuthenticationDTO };
