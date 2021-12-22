import ICreateCategoryDTO from "@modules/cars/dtos/ICreateCategoryDTO";
import Category from "@modules/cars/infra/typeorm/entities/Category";
import ICategoryRepository from "@modules/cars/repositories/ICategoryRepository";
import { getRepository, Repository } from "typeorm";

export default class CategoryRepositoryImpl implements ICategoryRepository {
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
