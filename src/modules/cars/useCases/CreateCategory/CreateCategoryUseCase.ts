import { inject, injectable } from "tsyringe";

import AppError from "../../../../errors/AppError";
import { ICategoryRepository } from "../../repositories/ICategoryRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  private categoryRespository: ICategoryRepository;

  constructor(
    @inject("CategoryRepositoryImpl")
    categoryRespository: ICategoryRepository
  ) {
    this.categoryRespository = categoryRespository;
  }

  async execute({ name, description }: IRequest): Promise<void> {
    const exists = await this.categoryRespository.findByName(name);

    if (exists) {
      throw new AppError("Category already exists!");
    } else {
      await this.categoryRespository.create({ name, description });
    }
  }
}
export { CreateCategoryUseCase };
