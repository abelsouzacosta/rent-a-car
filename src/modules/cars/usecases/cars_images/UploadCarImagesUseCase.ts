import { inject, injectable } from "tsyringe";

import { ISaveImageDTO } from "@modules/cars/dtos/cars/ISaveImageDTO";
import { ICarsImagesRepository } from "@modules/cars/repositories/cars_images/ICarsImagesRepository";
import { ICarRepository } from "@modules/cars/repositories/cars/ICarRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { ApplicationError } from "@shared/errors/ApplicationError";

@injectable()
class UploadCarImagesUseCase {
  private repository: ICarsImagesRepository;
  private carRepository: ICarRepository;
  private storageProvider: IStorageProvider;

  constructor(
    @inject("CarsImagesRepository")
    repository: ICarsImagesRepository,
    @inject("CarRepository")
    carRepository: ICarRepository,
    @inject("StorageProvider")
    storageProvider: IStorageProvider
  ) {
    Object.assign(this, { repository, carRepository, storageProvider });
  }

  async execute({ car_id, images_name }: ISaveImageDTO): Promise<void> {
    const car = await this.carRepository.findById(car_id);

    if (!car) throw new ApplicationError("Car not found", 404);

    images_name.forEach(async (image_name) => {
      await this.repository.upload({ car_id, image_name });
      await this.storageProvider.save(image_name, "cars");
    });
  }
}

export { UploadCarImagesUseCase };
