import { ICreateRentalDTO } from "@modules/rentals/dtos/rentals/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

interface IRentalRepository {
  create({
    start_date,
    end_date,
    expected_return_date,
    total,
    car_id,
    user_id,
  }: ICreateRentalDTO): Promise<void>;

  findById(id: string): Promise<Rental | undefined>;

  findRentalByUserId(user_id: string): Promise<Rental | undefined>;

  list(): Promise<Rental[]>;
}

export { IRentalRepository };
