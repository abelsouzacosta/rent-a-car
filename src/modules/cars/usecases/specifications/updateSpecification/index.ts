import { SpecificationRepository } from "@modules/cars/repositories/implementations/specification/SpecificationRepository";

import { UpdateSpecificationController } from "./UpdateSpecificationController";
import { UpdateSpecificationUseCase } from "./UpdateSpecificationUseCase";

export default (): UpdateSpecificationController => {
  const repository = new SpecificationRepository();

  const useCase = new UpdateSpecificationUseCase(repository);

  const update = new UpdateSpecificationController(useCase);

  return update;
};
