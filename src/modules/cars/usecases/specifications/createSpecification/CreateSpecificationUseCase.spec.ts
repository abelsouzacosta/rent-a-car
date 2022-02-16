import { ApplicationError } from "@errors/ApplicationError";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/specification/in-memory/SpecificationRepositoryInMemory";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

let create: CreateSpecificationUseCase;
let repository: SpecificationRepositoryInMemory;

describe("Create Specification", () => {
  beforeEach(() => {
    repository = new SpecificationRepositoryInMemory();
    create = new CreateSpecificationUseCase(repository);
  });

  it("should be able to create an category specification", async () => {
    const specification = {
      name: "Test Specification",
      description: "Test description specification",
    };

    await create.execute({
      name: specification.name,
      description: specification.description,
    });

    const created = await repository.findByName(specification.name);

    expect(created).toHaveProperty("id");
  });

  it("should not be able to create an category specification with a name already taken", async () => {
    expect(async () => {
      const specification = {
        name: "Test Specification",
        description: "Test description specification",
      };

      await create.execute({
        name: specification.name,
        description: specification.description,
      });

      await create.execute({
        name: specification.name,
        description: specification.description,
      });
    }).rejects.toBeInstanceOf(ApplicationError);
  });
});
