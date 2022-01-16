import { SpecificationRepository } from "@modules/cars/repositories/implementations/specification/SpecificationRepository";

import { CreateSepcificationController } from "./CreateSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

export default (): CreateSepcificationController => {
  const repository = new SpecificationRepository();

  const useCase = new CreateSpecificationUseCase(repository);

  const create = new CreateSepcificationController(useCase);

  return create;
};
