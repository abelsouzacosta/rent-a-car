import { Category } from "@cars/models/Category";

import {
  ICategoryRepository,
  ICreateCategoryDTO,
  IUpdateCategoryDTO,
} from "../../category/ICategoryRepository";

class CategoryRepository implements ICategoryRepository {
  private static INSTANCE: CategoryRepository;

  private categories: Category[];

  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoryRepository {
    if (!CategoryRepository.INSTANCE)
      CategoryRepository.INSTANCE = new CategoryRepository();

    return CategoryRepository.INSTANCE;
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      createdAt: new Date(),
    });

    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    return this.categories.find((category) => category.name === name);
  }

  findById(id: string): Category {
    return this.categories.find((category) => category.id === id);
  }

  update({ id, name, description }: IUpdateCategoryDTO): void {
    const category = this.findById(id);

    category.name = name || category.name;
    category.description = description || category.description;
    category.createdAt = new Date();
  }

  delete(id: string): void {
    const category = this.findById(id);

    const categoryIndex = this.categories.indexOf(category);

    this.categories.splice(categoryIndex, 1);
  }
}

export { CategoryRepository };
