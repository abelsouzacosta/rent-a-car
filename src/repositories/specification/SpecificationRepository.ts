import { Specification } from "@models/Specification";

import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
  IUpdateSpecificationDTO,
} from "./ISpecificationRepository";

class SpecificationRepository implements ISpecificationRepository {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  findByName(name: string): Specification {
    return this.specifications.find(
      (specification) => specification.name === name
    );
  }

  findById(id: string): Specification {
    return this.specifications.find((specification) => specification.id === id);
  }
  list(): Specification[] {
    return this.specifications;
  }
  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      createdAt: new Date(),
    });

    this.specifications.push(specification);
  }

  update({ id, name, description }: IUpdateSpecificationDTO): void {
    const specification = this.findById(id);

    specification.name = name || specification.name;
    specification.description = description || specification.description;
    specification.createdAt = new Date();
  }

  delete(id: string): void {
    const specification = this.findById(id);

    const specificationIndex = this.specifications.indexOf(specification);

    this.specifications.splice(specificationIndex, 1);
  }
}

export { SpecificationRepository };
