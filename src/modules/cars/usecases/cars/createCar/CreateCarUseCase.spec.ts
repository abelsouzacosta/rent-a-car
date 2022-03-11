import { CarRepositoryInMemory } from "@modules/cars/repositories/cars/in-memory/CarRepositoryInMemory";
import { CategoryRepositoryInMemory } from "@modules/cars/repositories/category/in-memory/CategoryRepositoryInMemory";
import { ApplicationError } from "@shared/errors/ApplicationError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let repository: CarRepositoryInMemory;
let categoryRepository: CategoryRepositoryInMemory;

describe("Create Car Use Case", () => {
  beforeEach(() => {
    repository = new CarRepositoryInMemory();
    categoryRepository = new CategoryRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(repository, categoryRepository);
  });

  it("Should be able to create a new car instance", async () => {
    const category = {
      name: "Random Category",
      description: "This is an some random category",
    };

    await categoryRepository.create(category);

    const { id: categoryId } = await categoryRepository.findByName(
      category.name
    );

    const car = {
      name: "EcoSport",
      description: "Suv de Entrada",
      daily_rate: 9090,
      license_plate: "KMO76VA",
      fine_amount: 1230.9,
      brand: "Ford",
      category_id: categoryId,
    };

    await createCarUseCase.execute(car);

    const created = await repository.findByName(car.name);

    expect(created).toHaveProperty("id");
  });

  it("should not be able to create a car with a license plate already taken", () => {
    expect(async () => {
      const category = {
        name: "Random Category",
        description: "This is an some random category",
      };

      await categoryRepository.create(category);

      const { id: categoryId } = await categoryRepository.findByName(
        category.name
      );

      const car1 = {
        name: "EcoSport",
        description: "Suv de Entrada",
        daily_rate: 9090,
        license_plate: "KMO76VA",
        fine_amount: 1230.9,
        brand: "Ford",
        category_id: categoryId,
      };

      const car2 = {
        name: "Focus",
        description: "Sedã Médio",
        daily_rate: 9232,
        license_plate: "KMO76VA",
        fine_amount: 1500,
        brand: "Ford",
        category_id: categoryId,
      };

      await createCarUseCase.execute(car1);
      await createCarUseCase.execute(car2);
    }).rejects.toBeInstanceOf(ApplicationError);
  });

  it("should be able to create a car with avaliable equals true by default", async () => {
    const category = {
      name: "Random Category",
      description: "This is an some random category",
    };

    await categoryRepository.create(category);

    const { id: categoryId } = await categoryRepository.findByName(
      category.name
    );

    const car = {
      name: "EcoSport",
      description: "Suv de Entrada",
      daily_rate: 9090,
      license_plate: "KMO76VA",
      fine_amount: 1230.9,
      brand: "Ford",
      category_id: categoryId,
    };

    await createCarUseCase.execute(car);

    const created = await repository.findByName(car.name);

    expect(created.avaliable).toBe(true);
  });

  it("should not be able to create an car with the daily_rate equal or lower than zero", () => {
    expect(async () => {
      const category = {
        name: "Random Category",
        description: "This is an some random category",
      };

      await categoryRepository.create(category);

      const { id: categoryId } = await categoryRepository.findByName(
        category.name
      );

      const car = {
        name: "EcoSport",
        description: "Suv de Entrada",
        daily_rate: -300,
        license_plate: "KMO76VA",
        fine_amount: 1230.9,
        brand: "Ford",
        category_id: categoryId,
      };

      await createCarUseCase.execute(car);
    }).rejects.toBeInstanceOf(ApplicationError);
  });

  it("should not be able to create a car instance with fine_amount equal or lower to zero", () => {
    expect(async () => {
      const category = {
        name: "Random Category",
        description: "This is an some random category",
      };

      await categoryRepository.create(category);

      const { id: categoryId } = await categoryRepository.findByName(
        category.name
      );

      const car = {
        name: "EcoSport",
        description: "Suv de Entrada",
        daily_rate: 300,
        license_plate: "KMO76VA",
        fine_amount: -100,
        brand: "Ford",
        category_id: categoryId,
      };

      await createCarUseCase.execute(car);
    }).rejects.toBeInstanceOf(ApplicationError);
  });

  it("should not be able to create a car instance with fine_amount greater than 1500", () => {
    expect(async () => {
      const category = {
        name: "Random Category",
        description: "This is an some random category",
      };

      await categoryRepository.create(category);

      const { id: categoryId } = await categoryRepository.findByName(
        category.name
      );

      const car = {
        name: "EcoSport",
        description: "Suv de Entrada",
        daily_rate: 300,
        license_plate: "KMO76VA",
        fine_amount: 1501,
        brand: "Ford",
        category_id: categoryId,
      };

      await createCarUseCase.execute(car);
    }).rejects.toBeInstanceOf(ApplicationError);
  });

  it("should not be able to create an car with an invalid categoryId given", () => {
    expect(async () => {
      const car = {
        name: "EcoSport",
        description: "Suv de Entrada",
        daily_rate: 300,
        license_plate: "KMO76VA",
        fine_amount: 1501,
        brand: "Ford",
        category_id: "c2007a85-db2c-4391-96ee-0b9460e75fd2",
      };

      await createCarUseCase.execute(car);
    }).rejects.toBeInstanceOf(ApplicationError);
  });
});
