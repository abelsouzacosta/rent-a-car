interface IRequest {
  car_id: string;
  specification_id: string;
}

interface ISpecificationsCarsRepository {
  create({ car_id, specification_id }: IRequest): Promise<void>;
}

export { ISpecificationsCarsRepository, IRequest };
