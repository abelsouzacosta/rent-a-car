import { Category } from "@cars/entities/Category";

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
  findByName(name: string): Promise<Category>;

  findById(id: string): Promise<Category>;

  list(): Promise<Category[]>;

  create({ name, description }: ICreateCategoryDTO): Promise<void>;

  update({ id, name, description }: IUpdateCategoryDTO): Promise<void>;

  delete(id: string): Promise<void>;
}

export { ICategoryRepository, ICreateCategoryDTO, IUpdateCategoryDTO };
