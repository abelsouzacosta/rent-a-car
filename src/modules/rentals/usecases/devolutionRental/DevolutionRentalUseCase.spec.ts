import dayjs from "dayjs";

import { UserRepositoryInMemory } from "@modules/accounts/repositories/users/in-memory/UserRepositoryInMemory";
import { CarRepositoryInMemory } from "@modules/cars/repositories/cars/in-memory/CarRepositoryInMemory";
import { RentalRepositoryInMemory } from "@modules/rentals/repositories/rentals/in-memory/RentalRepositoryInMemory";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { ApplicationError } from "@shared/errors/ApplicationError";

import { CreateRentalUseCase } from "../createRental/CreateRentalUseCase";
import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase";

let repository: RentalRepositoryInMemory;
let carRepository: CarRepositoryInMemory;
let userRepository: UserRepositoryInMemory;
let dateProvider: DayJsDateProvider;
let createRentalUseCase: CreateRentalUseCase;
let devolution: DevolutionRentalUseCase;

describe("Devolution Rental use Case", () => {
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
    devolution = new DevolutionRentalUseCase(repository, carRepository);
  });

  it("Should throws an exception when theres no rental for the given id", () => {
    expect(async () => {
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

      await devolution.execute({ id: "0981723hasdlkjh", user_id });
    }).rejects.toBeInstanceOf(ApplicationError);
  });

  it("Should throws an exception if the user are trying to make a devolution that does not belong to him", () => {
    expect(async () => {
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

      const { id, user_id: createUserId } = await repository.findRentalByUserId(
        user_id
      );

      console.log(createUserId === user_id);

      await devolution.execute({ id, user_id: "9087234-ans" });
    }).rejects.toBeInstanceOf(ApplicationError);
  });
});
