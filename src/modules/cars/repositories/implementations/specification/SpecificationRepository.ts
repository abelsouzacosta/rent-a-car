import { getRepository, Repository } from "typeorm";

import { ICreateSpecificationDTO } from "../../../dtos/specifications/ICreateSpecificationDTO";
import { IDeleteSpecificationDTO } from "../../../dtos/specifications/IDeleteSpecificationDTO";
import { IUpdateSpecificationDTO } from "../../../dtos/specifications/IUpdateSpecificationDTO";
import { Specification } from "../../../entities/Specification";
import { ISpecificationRepository } from "../../specification/ISpecificationRepository";

class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  findByName(name: string): Promise<Specification> {
    return this.repository.findOne({
      where: {
        name,
      },
    });
  }

  findById(id: string): Promise<Specification> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  list(): Promise<Specification[]> {
    return this.repository.find();
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);
  }

  async update({
    id,
    name,
    description,
  }: IUpdateSpecificationDTO): Promise<void> {
    const specification = await this.findById(id);

    specification.name = name || specification.name;
    specification.description = description || specification.description;
    specification.created_at = new Date();

    this.repository.save(specification);
  }

  async delete({ id }: IDeleteSpecificationDTO): Promise<void> {
    const specification = await this.findById(id);

    this.repository.remove(specification);
  }
}

export { SpecificationRepository };
