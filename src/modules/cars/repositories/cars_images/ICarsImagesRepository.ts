import { ICreateCarImageDTO } from "@modules/cars/dtos/cars/ICreateCarImageDTO";

interface ICarsImagesRepository {
  upload({ car_id, image_name }: ICreateCarImageDTO): Promise<void>;
}

export { ICarsImagesRepository };
