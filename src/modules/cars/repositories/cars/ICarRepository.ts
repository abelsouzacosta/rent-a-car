import { ICreateCarDTO } from "@modules/cars/dtos/cars/ICreateCarDTO";
import { IDeleteCarDTO } from "@modules/cars/dtos/cars/IDeleteCarDTO";
import { IUpdateCarDTO } from "@modules/cars/dtos/cars/IUpdateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

interface ICarRepository {
  findById(id: string): Promise<Car | undefined>;

  findByName(name: string): Promise<Car | undefined>;

  findByPlate(license_plate: string): Promise<Car | undefined>;

  create({
    name,
    description,
    daily_rate,
    available,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<void>;

  update({
    id,
    description,
    daily_rate,
    available,
    fine_amount,
    category_id,
  }: IUpdateCarDTO): Promise<void>;

  delete({ id }: IDeleteCarDTO): Promise<void>;
}

export { ICarRepository };
