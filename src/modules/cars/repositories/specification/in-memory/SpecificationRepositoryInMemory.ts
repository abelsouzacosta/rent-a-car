import { ICreateSpecificationDTO } from "src/modules/cars/dtos/specifications/ICreateSpecificationDTO";
import { IDeleteSpecificationDTO } from "src/modules/cars/dtos/specifications/IDeleteSpecificationDTO";
import { IUpdateSpecificationDTO } from "src/modules/cars/dtos/specifications/IUpdateSpecificationDTO";
import { Specification } from "src/modules/cars/entities/Specification";

import { ISpecificationRepository } from "../ISpecificationRepository";

class SpecificationRepositoryInMemory implements ISpecificationRepository {
  public specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  async findByName(name: string): Promise<Specification> {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    );

    return specification;
  }

  async findById(id: string): Promise<Specification> {
    const specification = this.specifications.find(
      (specification) => specification.id === id
    );

    return specification;
  }

  async list(): Promise<Specification[]> {
    return this.specifications;
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = new Specification();

    Object.assign(specification, { name, description });

    this.specifications.push(specification);
  }

  async update({
    id,
    name,
    description,
  }: IUpdateSpecificationDTO): Promise<void> {
    const specification = await this.findById(id);

    specification.name = name;
    specification.description = description;
  }

  async delete({ id }: IDeleteSpecificationDTO): Promise<void> {
    const specification = await this.findById(id);

    const index = this.specifications.indexOf(specification);

    this.specifications.splice(index, 1);
  }
}
