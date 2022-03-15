import { UserRepositoryInMemory } from "@modules/accounts/repositories/users/in-memory/UserRepositoryInMemory";
import { CarRepositoryInMemory } from "@modules/cars/repositories/cars/in-memory/CarRepositoryInMemory";
import { RentalRepositoryInMemory } from "@modules/rentals/repositories/rentals/in-memory/RentalRepositoryInMemory";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let repository: RentalRepositoryInMemory;
let userRepository: UserRepositoryInMemory;
let carRepository: CarRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;

describe("Car Rental Use Case", () => {
  beforeEach(() => {
    repository = new RentalRepositoryInMemory();
    userRepository = new UserRepositoryInMemory();
    carRepository = new CarRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      repository,
      userRepository,
      carRepository
    );
  });

  it("Should be able to create a new rental instance", async () => {
    const car = {
      name: "Supra",
      description: "Is That a Supraaaa?",
      fine_amount: 1998.91,
      daily_rate: 900,
      brand: "Toyota",
      license_plate: "nagata",
      category_id: "123",
    };

    const user = {
      name: "Abel Souza Costa Junior",
      email: "abel@junior.com",
      password: "123456",
      driver_license: "nagata",
    };

    carRepository.create(car);
    userRepository.create(user);

    const { id: user_id } = await userRepository.findByEmail(user.email);
    const { id: car_id } = await carRepository.findByName(car.name);

    await createRentalUseCase.execute({
      start_date: new Date(),
      end_date: new Date(),
      expected_return_date: new Date(),
      total: 1500,
      car_id,
      user_id,
    });

    const list = await repository.list();

    expect(list.length).toBe(1);
  });
});
