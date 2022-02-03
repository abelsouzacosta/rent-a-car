import { ICreateUserDTO } from "./ICreateUserDTO";

interface IUpdateUserDTO extends ICreateUserDTO {
  id: string;
}

export { IUpdateUserDTO };
