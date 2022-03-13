import { getRepository, Repository } from "typeorm";

import {
  IRequest,
  ISpecificationsCarsRepository,
} from "@modules/cars/repositories/specifications_cars/ISpecificationsCarsRepository";

import { SpecificationsCars } from "../entities/SpecificationsCars";

class SpecificationsCarsRepository implements ISpecificationsCarsRepository {
  private repository: Repository<SpecificationsCars>;

  constructor() {
    this.repository = getRepository(SpecificationsCars);
  }

  async create({ car_id, specification_id }: IRequest): Promise<void> {
    const relationship = this.repository.create({
      car_id,
      specification_id,
    });

    await this.repository.save(relationship);
  }
}

export { SpecificationsCarsRepository };
