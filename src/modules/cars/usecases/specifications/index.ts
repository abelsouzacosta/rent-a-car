import { SpecificationRepository } from "@modules/cars/repositories/specification/SpecificationRepository";

import { CreateSepcificationController } from "./createSpecification/CreateSpecificationController";
import { CreateSpecificationUseCase } from "./createSpecification/CreateSpecificationUseCase";

const repository = new SpecificationRepository();

const createSpecificationUseCase = new CreateSpecificationUseCase(repository);

const create = new CreateSepcificationController(createSpecificationUseCase);

export { create };
