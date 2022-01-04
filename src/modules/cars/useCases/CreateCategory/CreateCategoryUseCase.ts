import IRequestCreateCategory from "@modules/cars/dtos/IRequestCreateCategory";
import ICategoryRepository from "@modules/cars/repositories/ICategoryRepository";
import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppError";

@injectable()
export default class CreateCategoryUseCase {
  private categoryRespository: ICategoryRepository;

  constructor(
    @inject("CategoryRepositoryImpl")
    categoryRespository: ICategoryRepository
  ) {
    this.categoryRespository = categoryRespository;
  }

  async execute({ name, description }: IRequestCreateCategory): Promise<void> {
    const exists = await this.categoryRespository.findByName(name);

    if (exists) {
      throw new AppError("Category already exists!");
    } else {
      await this.categoryRespository.create({ name, description });
    }
  }
}
