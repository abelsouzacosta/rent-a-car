import { Specification } from "@cars/entities/Specification";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface IUpdateSpecificationDTO {
  id: string;
  name?: string;
  description?: string;
}

interface IDeleteSpecificationDTO {
  id: string;
}

interface ISpecificationRepository {
  findByName(name: string): Promise<Specification>;

  findById(id: string): Promise<Specification>;

  list(): Promise<Specification[]>;

  create({ name, description }: ICreateSpecificationDTO): Promise<void>;

  update({ id, name, description }: IUpdateSpecificationDTO): Promise<void>;

  delete(id: string): Promise<void>;
}

export {
  ISpecificationRepository,
  ICreateSpecificationDTO,
  IUpdateSpecificationDTO,
  IDeleteSpecificationDTO,
};
