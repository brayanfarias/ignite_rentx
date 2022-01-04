import ICreateCategoryDTO from "@modules/cars/dtos/ICreateCategoryDTO";
import Category from "@modules/cars/infra/typeorm/entities/Category";
import ICategoryRepository from "@modules/cars/repositories/ICategoryRepository";

export default class CategoryRepositoryImplMemory
  implements ICategoryRepository
{
  categories: Category[] = [];

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = new Category();
    Object.assign(category, { name, description });
    this.categories.push(category);

    return category;
  }
  async list(): Promise<Category[]> {
    const all = this.categories;
    return all;
  }
  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((c) => c.name === name);
    return category;
  }
}
