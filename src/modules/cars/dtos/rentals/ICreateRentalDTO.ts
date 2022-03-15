interface ICreateRentalDTO {
  start_date: Date;
  end_date?: Date;
  expected_return_date: Date;
  total: number;
  car_id: string;
  user_id: string;
}

export { ICreateRentalDTO };
