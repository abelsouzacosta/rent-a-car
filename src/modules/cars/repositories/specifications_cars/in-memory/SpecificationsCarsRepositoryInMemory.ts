import { SpecificationsCars } from "@modules/cars/infra/typeorm/entities/SpecificationsCars";

import {
  IRequest,
  ISpecificationsCarsRepository,
} from "../ISpecificationsCarsRepository";

class SpecificationsCarsRepositoryInMemory
  implements ISpecificationsCarsRepository
{
  public specifications_cars: SpecificationsCars[];

  constructor() {
    this.specifications_cars = [];
  }

  async create({ car_id, specification_id }: IRequest): Promise<void> {
    const specification_car = new SpecificationsCars();

    Object.assign(specification_car, { car_id, specification_id });

    this.specifications_cars.push(specification_car);
  }
}

export { SpecificationsCarsRepositoryInMemory };
