import { inject, injectable } from "tsyringe";

import { IListAvaliableCarsDTO } from "@modules/cars/dtos/cars/IListAvaliableCarsDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarRepository } from "@modules/cars/repositories/cars/ICarRepository";

@injectable()
class ListAvaliableCarsUseCase {
  private repository: ICarRepository;

  constructor(
    @inject("CarRepository")
    repository: ICarRepository
  ) {
    Object.assign(this, { repository });
  }

  async execute({
    name,
    brand,
    category_id,
  }: IListAvaliableCarsDTO): Promise<Car[]> {
    const avaliables = await this.repository.listAvaliables(
      name,
      brand,
      category_id
    );

    return avaliables;
  }
}

export { ListAvaliableCarsUseCase };
