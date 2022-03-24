import dayjs from "dayjs";

import { UserRepositoryInMemory } from "@modules/accounts/repositories/users/in-memory/UserRepositoryInMemory";
import { CarRepositoryInMemory } from "@modules/cars/repositories/cars/in-memory/CarRepositoryInMemory";
import { RentalRepositoryInMemory } from "@modules/rentals/repositories/rentals/in-memory/RentalRepositoryInMemory";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { ApplicationError } from "@shared/errors/ApplicationError";

import { CreateRentalUseCase } from "../createRental/CreateRentalUseCase";
import { DevolutionRentalUseCase } from "../devolutionRental/DevolutionRentalUseCase";
import { GetUserRentalsUseCase } from "./GetUserRentalsUseCase";

let repository: RentalRepositoryInMemory;
let userRepository: UserRepositoryInMemory;
let getUserRentalsUseCase: GetUserRentalsUseCase;
let carRepository: CarRepositoryInMemory;
let dateProvider: DayJsDateProvider;
let createRentalUseCase: CreateRentalUseCase;
let devolution: DevolutionRentalUseCase;

describe("Get User Rentals Use Case", () => {
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
    getUserRentalsUseCase = new GetUserRentalsUseCase(
      repository,
      userRepository
    );
    devolution = new DevolutionRentalUseCase(
      repository,
      carRepository,
      dateProvider
    );
  });

  it("Should throw an exception if there's no user with the id given", () => {
    expect(async () => {
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

      await getUserRentalsUseCase.execute("lkjasdf-9872134");
    }).rejects.toBeInstanceOf(ApplicationError);
  });

  it("Should be able to list all user's rentals", async () => {
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

    const rental = await createRentalUseCase.execute({
      expected_return_date: addsOneDay,
      car_id,
      user_id,
    });

    await devolution.execute({ id: rental.id, user_id });

    const newRental = await createRentalUseCase.execute({
      expected_return_date: addsOneDay,
      car_id,
      user_id,
    });

    await devolution.execute({ id: newRental.id, user_id });

    const rentals = await getUserRentalsUseCase.execute(user_id);

    expect(rentals).toHaveLength(2);
  });

  it("Should be able only the list a the given user", async () => {
    const car = {
      name: "Supra",
      description: "Is That a Supraaaa?",
      fine_amount: 100,
      daily_rate: 100,
      brand: "Toyota",
      license_plate: "nagata",
      category_id: "123",
    };

    const nissan = {
      name: "Silvia",
      description: "Mona Lisa",
      fine_amount: 1000,
      daily_rate: 2000,
      brand: "Nissan",
      license_plate: "another",
      category_id: "123",
    };

    const user = {
      name: "Abel Souza Costa Junior",
      email: "abel@junior.com",
      password: "123456",
      driver_license: "nagata",
    };

    const anotherUser = {
      name: "Emerson Marques",
      email: "emerson@email.com",
      password: "123456",
      driver_license: "smokey",
    };

    await carRepository.create(car);
    await carRepository.create(nissan);
    await userRepository.create(user);
    await userRepository.create(anotherUser);

    const { id: user_id } = await userRepository.findByEmail(user.email);
    const { id: another_user_id } = await userRepository.findByEmail(
      anotherUser.email
    );
    const { id: car_id } = await carRepository.findByName(car.name);
    const { id: another_car_id } = await carRepository.findByName(nissan.name);

    const rental = await createRentalUseCase.execute({
      expected_return_date: addsOneDay,
      car_id,
      user_id,
    });

    await devolution.execute({ id: rental.id, user_id });

    const newRental = await createRentalUseCase.execute({
      expected_return_date: addsOneDay,
      car_id,
      user_id,
    });

    await devolution.execute({ id: newRental.id, user_id });

    const otherUserRental = await createRentalUseCase.execute({
      expected_return_date: addsOneDay,
      car_id: another_car_id,
      user_id: another_user_id,
    });

    await devolution.execute({
      id: otherUserRental.id,
      user_id: another_user_id,
    });

    const firstUserRentals = await getUserRentalsUseCase.execute(user_id);
    const anotherUserRentals = await getUserRentalsUseCase.execute(
      another_user_id
    );

    expect(firstUserRentals).toHaveLength(2);
    expect(anotherUserRentals).toHaveLength(1);
  });
});
