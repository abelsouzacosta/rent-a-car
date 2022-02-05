import { ICreateCategoryDTO } from "../../dtos/categories/ICreateCategoryDTO";
import { IUpdateCategoryDTO } from "../../dtos/categories/IUpdateCategoryDTO";
import { Category } from "../../entities/Category";

interface ICategoryRepository {
  findByName(name: string): Promise<Category | undefined>;

  findById(id: string): Promise<Category | undefined>;

  list(): Promise<Category[]>;

  create({ name, description }: ICreateCategoryDTO): Promise<void>;

  update({ id, name, description }: IUpdateCategoryDTO): Promise<void>;

  delete(id: string): Promise<void>;
}

export { ICategoryRepository };
