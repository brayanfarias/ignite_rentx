import { ICategoryRepository } from "../../repositories/ICategoryRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  private categoryRespository: ICategoryRepository;

  constructor(categoryRespository: ICategoryRepository) {
    this.categoryRespository = categoryRespository;
  }

  execute({ name, description }: IRequest): void {
    const exists = this.categoryRespository.findByName(name);

    if (exists) {
      throw new Error("Category already exists!");
    } else {
      this.categoryRespository.create({ name, description });
    }
  }
}
export { CreateCategoryUseCase };
