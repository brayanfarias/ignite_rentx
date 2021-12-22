import ICreateSpecificationDTO from "@modules/cars/dtos/ICreateSpecificationDTO";
import Specification from "@modules/cars/infra/typeorm/entities/Specification";
import ISpecificationRepository from "@modules/cars/repositories/ISpecificationRepository";
import { getRepository, Repository } from "typeorm";

export default class SpecificationRepositoryImpl
  implements ISpecificationRepository
{
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async list(): Promise<Specification[]> {
    return this.repository.find();
  }

  async findByName(name: string): Promise<Specification> {
    return this.repository.findOne({ name });
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({
      name,
      description,
    });

    this.repository.save(specification);
    return specification;
  }
}
