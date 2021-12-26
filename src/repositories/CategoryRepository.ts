import { Category } from "../models/Category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

class CategoryRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
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

  update(id: string, name?: string, description?: string): void {
    const category = this.findById(id);

    category.name = name || category.name;
    category.description = description || category.description;
    category.createdAt = new Date();
  }
}

export { CategoryRepository };
