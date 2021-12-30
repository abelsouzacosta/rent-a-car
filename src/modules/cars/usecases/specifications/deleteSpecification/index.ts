import { SpecificationRepository } from "@modules/cars/repositories/implementations/specification/SpecificationRepository";

import { DeleteSpecificationController } from "./DeleteSpecificationController";
import { DeleteSpecificationUseCase } from "./DeleteSpecificationUseCase";

const repository = SpecificationRepository.getInstance();

const useCase = new DeleteSpecificationUseCase(repository);

const delete_specification = new DeleteSpecificationController(useCase);

export { delete_specification };
