import { SpecificationRepository } from "@modules/cars/repositories/specification/SpecificationRepository";

import { CreateSepcificationController } from "./createSpecification/CreateSpecificationController";
import { CreateSpecificationUseCase } from "./createSpecification/CreateSpecificationUseCase";
import { ListSpecificationsController } from "./listSpecifications/ListSpecificationsController";
import { ListSpecificationsUseCase } from "./listSpecifications/ListSpecificationsUseCase";
import { UpdateSpecificationController } from "./updateSpecification/UpdateSpecificationController";
import { UpdateSpecificationUseCase } from "./updateSpecification/UpdateSpecificationUseCase";

const repository = new SpecificationRepository();

const createSpecificationUseCase = new CreateSpecificationUseCase(repository);
const listSpecificationsUseCase = new ListSpecificationsUseCase(repository);
const updateSpecificationUseCase = new UpdateSpecificationUseCase(repository);

const create = new CreateSepcificationController(createSpecificationUseCase);
const list = new ListSpecificationsController(listSpecificationsUseCase);
const update = new UpdateSpecificationController(updateSpecificationUseCase);

export { create, list, update };
