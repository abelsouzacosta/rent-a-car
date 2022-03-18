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
  const addsOneDay = dayjs().add(1, "day").toDate();

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
    devolution = new DevolutionRentalUseCase(
      repository,
      carRepository,
      dateProvider
    );
  });

  it("Shuold be able to do a devolution to an valid rental", async () => {
    const car = {
      name: "Supra",
      description: "Is That a Supraaaa?",
      fine_amount: 100,
      daily_rate: 100,
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
      expected_return_date: addsOneDay,
      car_id,
      user_id,
    });

    const rental = await repository.findRentalByUserId(user_id);

    await devolution.execute({ id: rental.id, user_id });

    expect(rental.total).toBe(100);
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
        expected_return_date: addsOneDay,
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
        expected_return_date: addsOneDay,
        car_id,
        user_id,
      });

      const { id } = await repository.findRentalByUserId(user_id);

      await devolution.execute({ id, user_id: "9087234-ans" });
    }).rejects.toBeInstanceOf(ApplicationError);
  });

  it("Should throws an exception if the user are trying to do a devolution for a rental that does not belongs to the requester", () => {
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

      const toyota = {
        name: "Corolla",
        description: "Olds man car",
        fine_amount: 1998.91,
        daily_rate: 900,
        brand: "Toyota",
        license_plate: "granny",
        category_id: "123",
      };

      const user = {
        name: "Abel Souza Costa Junior",
        email: "abel@junior.com",
        password: "123456",
        driver_license: "nagata",
      };

      const another = {
        name: "Another User",
        email: "another@mail.com",
        password: "1234356",
        driver_license: "another",
      };

      await carRepository.create(car);
      await carRepository.create(toyota);
      await userRepository.create(user);
      await userRepository.create(another);

      const { id: user_id } = await userRepository.findByEmail(user.email);
      const { id: anotherUserId } = await userRepository.findByEmail(
        another.email
      );
      const { id: car_id } = await carRepository.findByName(car.name);
      const { id: carId } = await carRepository.findByName(toyota.name);

      await createRentalUseCase.execute({
        expected_return_date: addsOneDay,
        car_id,
        user_id,
      });

      await createRentalUseCase.execute({
        expected_return_date: addsOneDay,
        car_id: carId,
        user_id: anotherUserId,
      });

      const { id } = await repository.findRentalByUserId(user_id);

      await devolution.execute({ id, user_id: anotherUserId });
    }).rejects.toBeInstanceOf(ApplicationError);
  });
});
