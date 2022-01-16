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
  findByName(name: string): Specification;

  findById(id: string): Specification;

  list(): Specification[];

  create({ name, description }: ICreateSpecificationDTO): void;

  update({ id, name, description }: IUpdateSpecificationDTO): void;

  delete(id: string): void;
}

export {
  ISpecificationRepository,
  ICreateSpecificationDTO,
  IUpdateSpecificationDTO,
  IDeleteSpecificationDTO,
};
