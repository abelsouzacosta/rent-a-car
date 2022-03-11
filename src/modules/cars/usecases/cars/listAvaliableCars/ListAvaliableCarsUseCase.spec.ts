import { CarRepositoryInMemory } from "@modules/cars/repositories/cars/in-memory/CarRepositoryInMemory";

import { ListAvaliableCarsUseCase } from "./ListAvaliableCarsUseCase";

let listCarsUseCase: ListAvaliableCarsUseCase;
let repository: CarRepositoryInMemory;

describe("List avaliable cars use case", () => {
  beforeEach(() => {
    repository = new CarRepositoryInMemory();
    listCarsUseCase = new ListAvaliableCarsUseCase(repository);
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

    const avaliableCars = await listCarsUseCase.execute({});

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
      fine_amount: 1900.0,
      brand: "Ford",
      category_id: "cb21f8df-4858-4d8f-81a7-dc2f75ff7209",
    };

    await repository.create(firstCar);
    await repository.create(secondCar);

    await repository.rentCarWithPlate(secondCar.license_plate);

    const avaliableCars = await listCarsUseCase.execute({});

    expect(avaliableCars.length).toBe(1);
  });

  it("should be able to list all avaliable cars of a specific brand", async () => {
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

    const thirdCar = {
      name: "S10",
      description: "PickUp 4x4",
      daily_rate: 4554,
      license_plate: "MHM65M32",
      fine_amount: 1000.87,
      brand: "Chevrolet",
      category_id: "cb21f8df-4858-4d8f-81a7-dc2f75ff7209",
    };

    await repository.create(firstCar);
    await repository.create(secondCar);
    await repository.create(thirdCar);

    const avaliableChevroletCars = await listCarsUseCase.execute({
      brand: "Chevrolet",
    });

    expect(avaliableChevroletCars.length).toBe(1);
  });
});
