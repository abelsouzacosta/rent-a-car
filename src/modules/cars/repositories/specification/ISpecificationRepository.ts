import { Specification } from "@cars/entities/Specification";
import { ICreateSpecificationDTO } from "@modules/cars/dtos/specifications/ICreateSpecificationDTO";
import { IDeleteSpecificationDTO } from "@modules/cars/dtos/specifications/IDeleteSpecificationDTO";
import { IUpdateSpecificationDTO } from "@modules/cars/dtos/specifications/IUpdateSpecificationDTO";

interface ISpecificationRepository {
  findByName(name: string): Promise<Specification>;

  findById(id: string): Promise<Specification>;

  list(): Promise<Specification[]>;

  create({ name, description }: ICreateSpecificationDTO): Promise<void>;

  update({ id, name, description }: IUpdateSpecificationDTO): Promise<void>;

  delete({ id }: IDeleteSpecificationDTO): Promise<void>;
}

export { ISpecificationRepository };
