import { inject, injectable } from "tsyringe";

import { Specification } from "../../entities/Specification";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

@injectable()
class ListSpecificationsUseCase {
  private specificationRepository: ISpecificationRepository;

  constructor(
    @inject("SpecificationRepositoryImpl")
    specificationRepository: ISpecificationRepository
  ) {
    this.specificationRepository = specificationRepository;
  }

  async execute(): Promise<Specification[]> {
    return this.specificationRepository.list();
  }
}

export { ListSpecificationsUseCase };
