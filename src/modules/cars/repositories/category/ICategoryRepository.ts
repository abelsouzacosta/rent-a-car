import { Category } from "@cars/entities/Category";
import { ICreateCategoryDTO } from "@modules/cars/dtos/categories/ICreateCategoryDTO";
import { IUpdateCategoryDTO } from "@modules/cars/dtos/categories/IUpdateCategoryDTO";

interface ICategoryRepository {
  findByName(name: string): Promise<Category | undefined>;

  findById(id: string): Promise<Category | undefined>;

  list(): Promise<Category[]>;

  create({ name, description }: ICreateCategoryDTO): Promise<void>;

  update({ id, name, description }: IUpdateCategoryDTO): Promise<void>;

  delete(id: string): Promise<void>;
}

export { ICategoryRepository };
