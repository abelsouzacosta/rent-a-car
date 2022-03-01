import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/cars/ICreateCarDTO";
import { IDeleteCarDTO } from "@modules/cars/dtos/cars/IDeleteCarDTO";
import { IUpdateCarDTO } from "@modules/cars/dtos/cars/IUpdateCarDTO";
import { ICarRepository } from "@modules/cars/repositories/cars/ICarRepository";

import { Car } from "../entities/Car";

class CarRepository implements ICarRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async findById(id: string): Promise<Car | undefined> {
    const car = await this.repository.findOne({
      where: {
        id,
      },
    });

    return car;
  }

  async findByName(name: string): Promise<Car | undefined> {
    const car = await this.repository.findOne({
      where: {
        name,
      },
    });

    return car;
  }

  async findByPlate(license_plate: string): Promise<Car | undefined> {
    const car = await this.repository.findOne({
      where: {
        license_plate,
      },
    });

    return car;
  }

  async create({
    name,
    description,
    daily_rate,
    avaliable,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<void> {
    const car = this.repository.create({
      name,
      description,
      daily_rate,
      avaliable,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    await this.repository.save(car);
  }

  async update({
    id,
    description,
    daily_rate,
    avaliable,
    fine_amount,
    category_id,
  }: IUpdateCarDTO): Promise<void> {
    const car = await this.findById(id);

    car.description = description || car.description;
    car.daily_rate = daily_rate || car.daily_rate;
    car.avaliable = avaliable || car.avaliable;
    car.fine_amount = fine_amount || car.fine_amount;
    car.category_id = category_id || car.category_id;

    await this.repository.save(car);
  }

  async delete({ id }: IDeleteCarDTO): Promise<void> {
    const car = await this.findById(id);

    this.repository.remove(car);
  }
}

export { CarRepository };
