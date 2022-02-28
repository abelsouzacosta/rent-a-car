import { ICreateCategoryDTO } from "../../../dtos/categories/ICreateCategoryDTO";
import { IUpdateCategoryDTO } from "../../../dtos/categories/IUpdateCategoryDTO";
import { Category } from "../../../infra/typeorm/entities/Category";
import { ICategoryRepository } from "../ICategoryRepository";

class CategoryRepositoryInMemory implements ICategoryRepository {
  public categories: Category[];

  constructor() {
    this.categories = [];
  }

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);

    return category;
  }

  async findById(id: string): Promise<Category> {
    const category = this.categories.find((category) => category.id === id);

    return category;
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, { name, description });

    this.categories.push(category);
  }

  async update({ id, name, description }: IUpdateCategoryDTO): Promise<void> {
    const category = await this.findById(id);

    category.name = name;
    category.description = description;
  }

  async delete(id: string): Promise<void> {
    const category = await this.findById(id);

    const index = this.categories.indexOf(category);

    this.categories.splice(index, 1);
  }
}

export { CategoryRepositoryInMemory };
