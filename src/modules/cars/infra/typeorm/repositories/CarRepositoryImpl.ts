import IRequestCreateCarDTO from "@modules/cars/dtos/IRequestCreateCarDTO";
import ICarRepository from "@modules/cars/repositories/ICarRepository";
import { getRepository, Repository } from "typeorm";

import Car from "../entities/Car";

export default class CarRepositoryImpl implements ICarRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create(data: IRequestCreateCarDTO): Promise<Car> {
    const car = this.repository.create({ ...data });

    const created = await this.repository.save(car);
    return created;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.repository.findOne({ license_plate });
    return car;
  }
}
