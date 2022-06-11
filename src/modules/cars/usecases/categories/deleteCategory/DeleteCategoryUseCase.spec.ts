import { randomUUID } from "node:crypto";

import { ICreateCategoryDTO } from "@modules/cars/dtos/categories/ICreateCategoryDTO";
import { CategoryRepositoryInMemory } from "@modules/cars/repositories/category/in-memory/CategoryRepositoryInMemory";
import { ApplicationError } from "@shared/errors/ApplicationError";

import { CreateCategoryUseCase } from "../createCategory/CreateCategoryUseCase";
import { DeleteCategoryUseCase } from "./DeleteCategoryUseCase";

describe("Delete Category Use Case", () => {
  let repository: CategoryRepositoryInMemory;
  let create: CreateCategoryUseCase;
  let delete_category: DeleteCategoryUseCase;

  beforeAll(() => {
    repository = new CategoryRepositoryInMemory();
    create = new CreateCategoryUseCase(repository);
    delete_category = new DeleteCategoryUseCase(repository);
  });

  describe("Success Case", () => {
    it("Should delete a category inserted in the database", async () => {
      const category: ICreateCategoryDTO = {
        name: "test",
        description: "test",
      };

      await create.execute(category);

      const categoryFound = await repository.findByName(category.name);

      await delete_category.execute({ id: categoryFound.id });

      const categoryExists = await repository.findById(categoryFound.id);

      expect(categoryExists).toBeUndefined();
    });
  });

  describe("Fail case", () => {
    it("Should throw an error if a invalid id is provided", () => {
      expect(async () => {
        const id = randomUUID();

        await delete_category.execute({ id });
      }).rejects.toBeInstanceOf(ApplicationError);
    });
  });
});
