import { SpecificationRepository } from "@modules/cars/repositories/specification/SpecificationRepository";

import { CreateSepcificationController } from "./createSpecification/CreateSpecificationController";
import { CreateSpecificationUseCase } from "./createSpecification/CreateSpecificationUseCase";
import { ListSpecificationsController } from "./listSpecifications/ListSpecificationsController";
import { ListSpecificationsUseCase } from "./listSpecifications/ListSpecificationsUseCase";

const repository = new SpecificationRepository();

const createSpecificationUseCase = new CreateSpecificationUseCase(repository);
const listSpecificationsUseCase = new ListSpecificationsUseCase(repository);

const create = new CreateSepcificationController(createSpecificationUseCase);
const list = new ListSpecificationsController(listSpecificationsUseCase);

export { create, list };
