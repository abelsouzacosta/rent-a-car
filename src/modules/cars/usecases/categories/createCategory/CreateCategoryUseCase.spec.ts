import { ApplicationError } from "@errors/ApplicationError";
import { CategoryRepositoryInMemory } from "@modules/cars/repositories/category/in-memory/CategoryRepositoryInMemory";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let create: CreateCategoryUseCase;
let repository: CategoryRepositoryInMemory;

describe("Create Category", () => {
  beforeEach(() => {
    repository = new CategoryRepositoryInMemory();
    create = new CreateCategoryUseCase(repository);
  });

  it("should be able to create an category", async () => {
    const category = {
      name: "Test category",
      description: "Test description",
    };

    await create.execute({
      name: category.name,
      description: category.description,
    });

    const created = await repository.findByName(category.name);

    expect(created).toHaveProperty("id");
  });

  it("should not be able to create an category with a name already taken", async () => {
    expect(async () => {
      const category = {
        name: "Test category",
        description: "Test description",
      };

      await create.execute({
        name: category.name,
        description: category.description,
      });

      await create.execute({
        name: category.name,
        description: category.description,
      });
    }).rejects.toBeInstanceOf(ApplicationError);
  });
});
