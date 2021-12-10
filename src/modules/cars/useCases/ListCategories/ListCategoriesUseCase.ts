import { Category } from "../../model/Category";
import { ICategoryRepository } from "../../repositories/ICategoryRepository";

class ListCategoriesUseCase {
  private categoryRespository: ICategoryRepository;

  constructor(categoryRespository: ICategoryRepository) {
    this.categoryRespository = categoryRespository;
  }

  execute(): Category[] {
    return this.categoryRespository.list();
  }
}

export { ListCategoriesUseCase };
