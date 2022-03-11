import { CarRepositoryInMemory } from "@modules/cars/repositories/cars/in-memory/CarRepositoryInMemory";

import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let repository: CarRepositoryInMemory;

describe("List cars use case", () => {
  beforeEach(() => {
    repository = new CarRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(repository);
  });

  it("should return all avaliable cars in the database", async () => {
    const firstCar = {
      name: "EcoSport",
      description: "Suv de Entrada",
      daily_rate: 9090,
      license_plate: "KMO76VA",
      fine_amount: 1230.9,
      brand: "Ford",
      category_id: "d682ea1a-a5c1-45fc-9286-1f9e72b06152",
    };

    const secondCar = {
      name: "Focus",
      description: "Sedã médio",
      daily_rate: 9890,
      license_plate: "KHWW987H",
      fine_amount: 1900.0,
      brand: "Ford",
      category_id: "cb21f8df-4858-4d8f-81a7-dc2f75ff7209",
    };

    await repository.create(firstCar);
    await repository.create(secondCar);

    const avaliableCars = await listCarsUseCase.execute();

    expect(avaliableCars.length).toBe(2);
  });

  it("Should not return cars that are not avaliable", async () => {
    const firstCar = {
      name: "EcoSport",
      description: "Suv de Entrada",
      daily_rate: 9090,
      license_plate: "KMO76VA",
      fine_amount: 1230.9,
      brand: "Ford",
      category_id: "d682ea1a-a5c1-45fc-9286-1f9e72b06152",
    };

    const secondCar = {
      name: "Focus",
      description: "Sedã médio",
      daily_rate: 9890,
      license_plate: "KHWW987H",
      avaliable: false,
      fine_amount: 1900.0,
      brand: "Ford",
      category_id: "cb21f8df-4858-4d8f-81a7-dc2f75ff7209",
    };

    await repository.create(firstCar);
    await repository.create(secondCar);

    await repository.rentCarWithPlate(secondCar.license_plate);

    const avaliableCars = await listCarsUseCase.execute();

    expect(avaliableCars.length).toBe(1);
  });
});
