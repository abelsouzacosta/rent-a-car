import { SpecificationRepository } from "@modules/cars/repositories/implementations/specification/SpecificationRepository";

import { ListSpecificationsController } from "./ListSpecificationsController";
import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

export default (): ListSpecificationsController => {
  const repository = new SpecificationRepository();

  const useCase = new ListSpecificationsUseCase(repository);

  const list = new ListSpecificationsController(useCase);

  return list;
};
