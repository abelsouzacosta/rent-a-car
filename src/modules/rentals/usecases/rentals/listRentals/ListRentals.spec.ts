import dayjs from "dayjs";

import { UserRepositoryInMemory } from "@modules/accounts/repositories/users/in-memory/UserRepositoryInMemory";
import { CarRepositoryInMemory } from "@modules/cars/repositories/cars/in-memory/CarRepositoryInMemory";
import { RentalRepositoryInMemory } from "@modules/rentals/repositories/rentals/in-memory/RentalRepositoryInMemory";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";

import { CreateRentalUseCase } from "../createRental/CreateRentalUseCase";
import { ListRentalsUseCase } from "./ListRentalsUseCase";

let repository: RentalRepositoryInMemory;
let carRepository: CarRepositoryInMemory;
let userRepository: UserRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let dateProvider: DayJsDateProvider;
let listRentalsUseCase: ListRentalsUseCase;

describe("List Rentals Use Case", () => {
  const add24HoursToDay = dayjs().add(24, "hours").toDate();

  beforeEach(() => {
    repository = new RentalRepositoryInMemory();
    carRepository = new CarRepositoryInMemory();
    userRepository = new UserRepositoryInMemory();
    dateProvider = new DayJsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      repository,
      userRepository,
      carRepository,
      dateProvider
    );
    listRentalsUseCase = new ListRentalsUseCase(repository);
  });

  it("Should be able to list all rentals in the database", async () => {
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

    await carRepository.create(car);
    await userRepository.create(user);

    const { id: user_id } = await userRepository.findByEmail(user.email);
    const { id: car_id } = await carRepository.findByName(car.name);

    await createRentalUseCase.execute({
      expected_return_date: add24HoursToDay,
      car_id,
      user_id,
    });

    const list = await listRentalsUseCase.execute();

    expect(list.length).toBe(1);
  });
});
