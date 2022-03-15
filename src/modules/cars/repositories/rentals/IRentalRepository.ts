import { ICreateRentalDTO } from "@modules/cars/dtos/rentals/ICreateRentalDTO";
import { Rental } from "@modules/cars/infra/typeorm/entities/Rental";

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
}

export { IRentalRepository };
