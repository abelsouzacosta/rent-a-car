import { SpecificationRepository } from "@modules/cars/repositories/specification/SpecificationRepository";

import { CreateSepcificationController } from "./CreateSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

const repository = SpecificationRepository.getInstance();

const useCase = new CreateSpecificationUseCase(repository);

const create = new CreateSepcificationController(useCase);

export { create };
