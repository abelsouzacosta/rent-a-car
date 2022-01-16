import { SpecificationRepository } from "@modules/cars/repositories/implementations/specification/SpecificationRepository";

import { DeleteSpecificationController } from "./DeleteSpecificationController";
import { DeleteSpecificationUseCase } from "./DeleteSpecificationUseCase";

export default (): DeleteSpecificationController => {
  const repository = new SpecificationRepository();

  const useCase = new DeleteSpecificationUseCase(repository);

  const delete_specification = new DeleteSpecificationController(useCase);

  return delete_specification;
};
