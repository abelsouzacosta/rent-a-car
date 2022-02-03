import { Category } from "@cars/entities/Category";
import { ICreateCategoryDTO } from "@modules/cars/dtos/categories/ICreateCategoryDTO";
import { IUpdateCategoryDTO } from "@modules/cars/dtos/categories/IUpdateCategoryDTO";
import { getRepository, Repository } from "typeorm";

import { ICategoryRepository } from "../../category/ICategoryRepository";

class CategoryRepository implements ICategoryRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description,
    });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    return this.repository.find();
  }

  findByName(name: string): Promise<Category> {
    return this.repository.findOne({
      where: {
        name,
      },
    });
  }

  async findById(id: string): Promise<Category> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  async update({ id, name, description }: IUpdateCategoryDTO): Promise<void> {
    const category = await this.findById(id);

    category.name = name || category.name;
    category.description = description || category.description;
    category.created_at = new Date();

    await this.repository.save(category);
  }

  async delete(id: string): Promise<void> {
    const category = await this.findById(id);

    await this.repository.remove(category);
  }
}

export { CategoryRepository };
