import Category from "@modules/cars/infra/typeorm/entities/Category";
import ICategoryRepository from "@modules/cars/repositories/ICategoryRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export default class ListCategoriesUseCase {
  private categoryRespository: ICategoryRepository;

  constructor(
    @inject("CategoryRepositoryImpl")
    categoryRespository: ICategoryRepository
  ) {
    this.categoryRespository = categoryRespository;
  }

  async execute(): Promise<Category[]> {
    return this.categoryRespository.list();
  }
}
