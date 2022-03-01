interface IUpdateCarDTO {
  id: string;
  description: string;
  daily_rate: number;
  available: boolean;
  fine_amount: number;
  category_id: string;
}

export { IUpdateCarDTO };
