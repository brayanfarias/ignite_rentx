import { Specification } from "../../model/Specification";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

class ListSpecificationsUseCase {
  private specificationRepository: ISpecificationRepository;

  constructor(specificationRepository: ISpecificationRepository) {
    this.specificationRepository = specificationRepository;
  }

  execute(): Specification[] {
    return this.specificationRepository.list();
  }
}

export { ListSpecificationsUseCase };
