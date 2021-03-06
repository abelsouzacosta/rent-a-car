import { ICreateCarDTO } from "@modules/cars/dtos/cars/ICreateCarDTO";
import { IDeleteCarDTO } from "@modules/cars/dtos/cars/IDeleteCarDTO";
import { IUpdateCarDTO } from "@modules/cars/dtos/cars/IUpdateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarRepository } from "../ICarRepository";

class CarRepositoryInMemory implements ICarRepository {
  public cars: Car[];

  constructor() {
    this.cars = [];
  }

  async listAvaliables(
    name?: string,
    brand?: string,
    category_id?: string
  ): Promise<Car[] | undefined> {
    const avaliableCars = this.cars.filter((car) => {
      if (
        (name && car.name === name) ||
        (brand && car.brand === brand) ||
        (category_id && car.category_id === category_id)
      ) {
        return car;
      }

      if (!name && !brand && !category_id && car.avaliable) {
        return car;
      }

      return null;
    });

    return avaliableCars;
  }

  async findById(id: string): Promise<Car> {
    const car = this.cars.find((car) => car.id === id);

    return car;
  }

  async findByName(name: string): Promise<Car> {
    const car = this.cars.find((car) => car.name === name);

    return car;
  }

  async findByPlate(license_plate: string): Promise<Car> {
    const car = this.cars.find((car) => car.license_plate === license_plate);

    return car;
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<void> {
    const car = new Car();

    car.avaliable = true;

    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    this.cars.push(car);
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

    car.description = description;
    car.daily_rate = daily_rate;
    car.avaliable = avaliable;
    car.fine_amount = fine_amount;
    car.category_id = category_id;
  }

  async delete({ id }: IDeleteCarDTO): Promise<void> {
    const car = await this.findById(id);

    const index = this.cars.indexOf(car);

    this.cars.splice(index, 1);
  }

  async rentCarWithPlate(license_plate: string): Promise<void> {
    const car = await this.findByPlate(license_plate);

    car.avaliable = false;
  }

  async returnCarWithId(id: string): Promise<void> {
    const car = await this.findById(id);

    car.avaliable = true;
  }
}

export { CarRepositoryInMemory };
