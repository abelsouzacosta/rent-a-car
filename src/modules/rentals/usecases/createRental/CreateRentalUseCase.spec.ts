import dayjs from "dayjs";

import { UserRepositoryInMemory } from "@modules/accounts/repositories/users/in-memory/UserRepositoryInMemory";
import { CarRepositoryInMemory } from "@modules/cars/repositories/cars/in-memory/CarRepositoryInMemory";
import { RentalRepositoryInMemory } from "@modules/rentals/repositories/rentals/in-memory/RentalRepositoryInMemory";
import { ApplicationError } from "@shared/errors/ApplicationError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let repository: RentalRepositoryInMemory;
let userRepository: UserRepositoryInMemory;
let carRepository: CarRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;

describe("Car Rental Use Case", () => {
  const add24HoursToDay = dayjs().add(24, "hours").toDate();
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

    await carRepository.create(car);
    await userRepository.create(user);

    const { id: user_id } = await userRepository.findByEmail(user.email);
    const { id: car_id } = await carRepository.findByName(car.name);

    await createRentalUseCase.execute({
      expected_return_date: add24HoursToDay,
      car_id,
      user_id,
    });

    const list = await repository.list();

    expect(list.length).toBe(1);
  });

  it("Should not be able to create an rental for a non existent car", () => {
    expect(async () => {
      const user = {
        name: "Abel Souza Costa Junior",
        email: "abel@junior.com",
        password: "123456",
        driver_license: "nagata",
      };

      userRepository.create(user);

      const { id: user_id } = await userRepository.findByEmail(user.email);

      await createRentalUseCase.execute({
        expected_return_date: add24HoursToDay,
        car_id: "123456",
        user_id,
      });
    }).rejects.toBeInstanceOf(ApplicationError);
  });

  it("Should not be able to create an rental for a user that not exists", () => {
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

      await carRepository.create(car);

      const { id: car_id } = await carRepository.findByName(car.name);

      await createRentalUseCase.execute({
        expected_return_date: add24HoursToDay,
        car_id,
        user_id: "123456",
      });
    }).rejects.toBeInstanceOf(ApplicationError);
  });

  it("Should not be able to create an rental for a car that is not available", () => {
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

      await carRepository.rentCarWithPlate(car.license_plate);

      const { id: user_id } = await userRepository.findByEmail(user.email);
      const { id: car_id } = await carRepository.findByName(car.name);

      await createRentalUseCase.execute({
        expected_return_date: add24HoursToDay,
        car_id,
        user_id,
      });
    }).rejects.toBeInstanceOf(ApplicationError);
  });

  it("Should not be able to create an rental for a user who already open rental operation", () => {
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

      const car2 = {
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
      await carRepository.create(car2);
      await userRepository.create(user);

      const { id: user_id } = await userRepository.findByEmail(user.email);
      const { id: car_id } = await carRepository.findByName(car.name);
      const { id: carId } = await carRepository.findByName(car2.name);

      await createRentalUseCase.execute({
        expected_return_date: add24HoursToDay,
        car_id,
        user_id,
      });

      await createRentalUseCase.execute({
        expected_return_date: add24HoursToDay,
        car_id: carId,
        user_id,
      });
    }).rejects.toBeInstanceOf(ApplicationError);
  });

  it("Should change the available status of the car requested by the user to false", async () => {
    const car = {
      name: "Supra",
      description: "Is That a Supraaaa?",
      fine_amount: 1998.91,
      daily_rate: 900,
      brand: "Toyota",
      license_plate: "nagata",
      category_id: "123",
    };

    await carRepository.create(car);

    const user = {
      name: "Abel Souza Costa Junior",
      email: "abel@junior.com",
      password: "123456",
      driver_license: "nagata",
    };

    await userRepository.create(user);

    const { id: user_id } = await userRepository.findByEmail(user.email);
    const { id: car_id } = await carRepository.findByName(car.name);

    await createRentalUseCase.execute({
      expected_return_date: add24HoursToDay,
      car_id,
      user_id,
    });

    const rentedCar = await carRepository.findByName(car.name);

    expect(rentedCar.avaliable).toBeFalsy();
  });

  it("Should not create an rental with duration less than 24 hours ", () => {
    expect(async () => {
      const add23HoursToDay = dayjs().add(23, "hours").toDate();
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
        expected_return_date: add23HoursToDay,
        car_id,
        user_id,
      });
    }).rejects.toBeInstanceOf(ApplicationError);
  });
});
