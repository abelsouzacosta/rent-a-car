import { CarRepositoryInMemory } from "@modules/cars/repositories/cars/in-memory/CarRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/specification/in-memory/SpecificationRepositoryInMemory";
import { SpecificationsCarsRepositoryInMemory } from "@modules/cars/repositories/specifications_cars/in-memory/SpecificationsCarsRepositoryInMemory";
import { ApplicationError } from "@shared/errors/ApplicationError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carRepository: CarRepositoryInMemory;
let specificationRepository: SpecificationRepositoryInMemory;
let specificationsCarsRepository: SpecificationsCarsRepositoryInMemory;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carRepository = new CarRepositoryInMemory();
    specificationRepository = new SpecificationRepositoryInMemory();
    specificationsCarsRepository = new SpecificationsCarsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carRepository,
      specificationRepository,
      specificationsCarsRepository
    );
  });

  it("Should be able to create an specification for a car", async () => {
    const specification1 = {
      name: "Test Specification 1",
      description: "This is an test specification",
    };

    const specification2 = {
      name: "Another Test Specification",
      description: "This is an test description",
    };

    const car = {
      name: "Test Car",
      description: "Car test",
      daily_rate: 1000,
      license_plate: "TEST123",
      fine_amount: 1000,
      brand: "Test Brand",
      category_id: "123",
    };

    await carRepository.create(car);
    await specificationRepository.create(specification1);
    await specificationRepository.create(specification2);

    const { id: carId } = await carRepository.findByName(car.name);
    const { id: specification1Id } = await specificationRepository.findByName(
      specification1.name
    );
    const { id: specification2Id } = await specificationRepository.findByName(
      specification2.name
    );

    await createCarSpecificationUseCase.execute({
      car_id: carId,
      specifications_id: [specification1Id, specification2Id],
    });
  });

  it("Should not be able to create a car specification for a non existent car", () => {
    expect(async () => {
      const specification = {
        name: "Test Specification",
        description: "This is an test specification",
      };

      specificationRepository.create(specification);

      const { id: specificationId } = await specificationRepository.findByName(
        specification.name
      );

      await createCarSpecificationUseCase.execute({
        car_id: "123456",
        specifications_id: [specificationId],
      });
    }).rejects.toBeInstanceOf(ApplicationError);
  });

  it("Shold not be able to create a car specification with a non existent specification", () => {
    expect(async () => {
      const car = {
        name: "Test Car",
        description: "Car test",
        daily_rate: 1000,
        license_plate: "TEST123",
        fine_amount: 1000,
        brand: "Test Brand",
        category_id: "123",
      };

      await carRepository.create(car);

      const { id: carId } = await carRepository.findByName(car.name);

      await createCarSpecificationUseCase.execute({
        car_id: carId,
        specifications_id: ["09817234"],
      });
    }).rejects.toBeInstanceOf(ApplicationError);
  });
});
