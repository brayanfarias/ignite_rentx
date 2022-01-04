import ICreateSpecificationDTO from "@modules/cars/dtos/ICreateSpecificationDTO";
import Specification from "@modules/cars/infra/typeorm/entities/Specification";

import ISpecificationRepository from "../ISpecificationRepository";

export default class SpecificationImplMemory
  implements ISpecificationRepository
{
  private specifications: Specification[] = [];

  async create(data: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      name: data.name,
      description: data.description,
    });

    this.specifications.push(specification);

    return specification;
  }
  async findByName(name: string): Promise<Specification> {
    const specification = this.specifications.find((s) => s.name === name);
    return specification;
  }

  async list(): Promise<Specification[]> {
    return this.specifications;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const allFounded = this.specifications.filter((specification) =>
      ids.includes(specification.id)
    );
    return allFounded;
  }
}
