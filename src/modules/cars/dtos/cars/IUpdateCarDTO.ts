interface IUpdateCarDTO {
  id: string;
  description: string;
  daily_rate: number;
  avaliable: boolean;
  fine_amount: number;
  category_id: string;
}

export { IUpdateCarDTO };
