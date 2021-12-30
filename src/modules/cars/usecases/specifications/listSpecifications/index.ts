import { SpecificationRepository } from "@modules/cars/repositories/specification/SpecificationRepository";

import { ListSpecificationsController } from "./ListSpecificationsController";
import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

const repository = SpecificationRepository.getInstance();

const useCase = new ListSpecificationsUseCase(repository);

const list = new ListSpecificationsController(useCase);

export { list };
