interface ICreateRentalDTO {
  start_date: Date;
  end_date?: Date;
  expected_return_date: Date;
  total: number;
  user_id: string;
  car_id: string;
}

export { ICreateRentalDTO };
