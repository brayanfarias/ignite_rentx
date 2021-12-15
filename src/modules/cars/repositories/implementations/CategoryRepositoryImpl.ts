import { getRepository, Repository } from "typeorm";

import ICreateCategoryDTO from "../../dtos/ICreateCategoryDTO";
import { Category } from "../../entities/Category";
import { ICategoryRepository } from "../ICategoryRepository";

class CategoryRepositoryImpl implements ICategoryRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = this.repository.create({
      name,
      description,
    });

    await this.repository.save(category);
    return category;
  }

  async list(): Promise<Category[]> {
    const categories: Category[] = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category: Category = await this.repository.findOne({ name });
    return category;
  }
}
export { CategoryRepositoryImpl };
