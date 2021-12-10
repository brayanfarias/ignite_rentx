import { Specification } from "../../model/Specification";
import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from "../ISpecificationRepository";

class SpecificationRepositoryImpl implements ISpecificationRepository {
  private specifications: Specification[];

  // eslint-disable-next-line no-use-before-define
  private static INSTANCE: SpecificationRepositoryImpl;
  private constructor() {
    this.specifications = [];
  }

  public static getInstance(): SpecificationRepositoryImpl {
    if (!SpecificationRepositoryImpl.INSTANCE) {
      SpecificationRepositoryImpl.INSTANCE = new SpecificationRepositoryImpl();
    }
    return this.INSTANCE;
  }
  list(): Specification[] {
    return this.specifications;
  }
  findByName(name: string): Specification {
    return this.specifications.find((s) => s.name === name);
  }

  create({ name, description }: ICreateSpecificationDTO): Specification {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });
    this.specifications.push(specification);
    return specification;
  }
}

export { SpecificationRepositoryImpl };
