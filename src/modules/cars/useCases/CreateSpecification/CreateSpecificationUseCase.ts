import ISpecificationRepository from "@modules/cars/repositories/ISpecificationRepository";
import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  private specificationRespository: ISpecificationRepository;

  constructor(
    @inject("SpecificationRepositoryImpl")
    specificationRespository: ISpecificationRepository
  ) {
    this.specificationRespository = specificationRespository;
  }

  async execute({ name, description }: IRequest): Promise<void> {
    const exists = await this.specificationRespository.findByName(name);

    if (exists) {
      throw new AppError("Specification already exists!");
    } else {
      await this.specificationRespository.create({ name, description });
    }
  }
}
export { CreateSpecificationUseCase };
