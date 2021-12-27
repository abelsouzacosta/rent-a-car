import { Category } from "../../models/Category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface IUpdateCategoryDTO {
  id: string;
  name?: string;
  description?: string;
}

interface ICategoryRepository {
  findByName(name: string): Category;

  findById(id: string): Category;

  list(): Category[];

  create({ name, description }: ICreateCategoryDTO): void;

  update({ id, name, description }: IUpdateCategoryDTO): void;

  delete(id: string): void;
}

export { ICategoryRepository, ICreateCategoryDTO, IUpdateCategoryDTO };
