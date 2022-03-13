import { getRepository, Repository } from "typeorm";

import { ICreateCarImageDTO } from "@modules/cars/dtos/cars/ICreateCarImageDTO";
import { ICarsImagesRepository } from "@modules/cars/repositories/cars_images/ICarsImagesRepository";

import { CarsImages } from "../entities/CarsImages";

class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarsImages>;

  constructor() {
    this.repository = getRepository(CarsImages);
  }

  async upload({ car_id, image_name }: ICreateCarImageDTO): Promise<void> {
    const car_image = this.repository.create({
      car_id,
      image_name,
    });

    await this.repository.save(car_image);
  }
}

export { CarsImagesRepository };
