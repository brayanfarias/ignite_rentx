import Specification from "@modules/cars/infra/typeorm/entities/Specification";
import ISpecificationRepository from "@modules/cars/repositories/ISpecificationRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export default class ListSpecificationsUseCase {
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
