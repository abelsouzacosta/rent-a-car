import { CarRepositoryInMemory } from "@modules/cars/repositories/cars/in-memory/CarRepositoryInMemory";
import { ApplicationError } from "@shared/errors/ApplicationError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let repository: CarRepositoryInMemory;

describe("Create Car Use Case", () => {
  beforeEach(() => {
    repository = new CarRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(repository);
  });

  it("should be able to create a new car instance", async () => {
    const car = {
      name: "EcoSport",
      description: "Suv de Entrada",
      daily_rate: 9090,
      license_plate: "KMO76VA",
      fine_amount: 1230.9,
      brand: "Ford",
      category_id: "c2007a85-db2c-4391-96ee-0b9460e75fd2",
    };

    await createCarUseCase.execute(car);

    const created = await repository.findByName(car.name);

    expect(created).toHaveProperty("id");
  });

  it("should not be able to create a car with a license plate already taken", () => {
    expect(async () => {
      const car1 = {
        name: "EcoSport",
        description: "Suv de Entrada",
        daily_rate: 9090,
        license_plate: "KMO76VA",
        fine_amount: 1230.9,
        brand: "Ford",
        category_id: "c2007a85-db2c-4391-96ee-0b9460e75fd2",
      };

      const car2 = {
        name: "Focus",
        description: "Sedã Médio",
        daily_rate: 9232,
        license_plate: "KMO76VA",
        fine_amount: 1500,
        brand: "Ford",
        category_id: "c2007a85-db2c-4391-96ee-0b9460e75fd2",
      };

      await createCarUseCase.execute(car1);
      await createCarUseCase.execute(car2);
    }).rejects.toBeInstanceOf(ApplicationError);
  });
});
