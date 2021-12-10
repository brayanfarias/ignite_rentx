import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  private specificationRespository: ISpecificationRepository;

  constructor(specificationRespository: ISpecificationRepository) {
    this.specificationRespository = specificationRespository;
  }

  execute({ name, description }: IRequest): void {
    const exists = this.specificationRespository.findByName(name);

    if (exists) {
      throw new Error("Specification already exists!");
    } else {
      this.specificationRespository.create({ name, description });
    }
  }
}
export { CreateSpecificationUseCase };
