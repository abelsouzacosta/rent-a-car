import { SpecificationRepository } from "@modules/cars/repositories/specification/SpecificationRepository";

import { UpdateSpecificationController } from "./UpdateSpecificationController";
import { UpdateSpecificationUseCase } from "./UpdateSpecificationUseCase";

const repository = SpecificationRepository.getInstance();

const useCase = new UpdateSpecificationUseCase(repository);

const update = new UpdateSpecificationController(useCase);

export { update };
