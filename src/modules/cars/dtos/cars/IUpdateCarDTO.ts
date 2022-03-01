interface IUpdateCarDTO {
  id: string;
  description: string;
  daily_rate: number;
  available: boolean;
  fine_amount: string;
  category_id: string;
}

export { IUpdateCarDTO };
