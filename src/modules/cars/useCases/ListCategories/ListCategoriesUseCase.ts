import { inject, injectable } from "tsyringe";

import { Category } from "../../entities/Category";
import { ICategoryRepository } from "../../repositories/ICategoryRepository";

@injectable()
class ListCategoriesUseCase {
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

export { ListCategoriesUseCase };
