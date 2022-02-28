import { ICreateSpecificationDTO } from "../../dtos/specifications/ICreateSpecificationDTO";
import { IDeleteSpecificationDTO } from "../../dtos/specifications/IDeleteSpecificationDTO";
import { IUpdateSpecificationDTO } from "../../dtos/specifications/IUpdateSpecificationDTO";
import { Specification } from "../../infra/typeorm/entities/Specification";

interface ISpecificationRepository {
  findByName(name: string): Promise<Specification | undefined>;

  findById(id: string): Promise<Specification | undefined>;

  list(): Promise<Specification[]>;

  create({ name, description }: ICreateSpecificationDTO): Promise<void>;

  update({ id, name, description }: IUpdateSpecificationDTO): Promise<void>;

  delete({ id }: IDeleteSpecificationDTO): Promise<void>;
}

export { ISpecificationRepository };
