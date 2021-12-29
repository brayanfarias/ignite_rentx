import IRequestCreateCarDTO from "@modules/cars/dtos/IRequestCreateCarDTO";
import IRequestListAvailableCarDTO from "@modules/cars/dtos/IRequestListCarDTO";
import ICarRepository from "@modules/cars/repositories/ICarRepository";
import { getRepository, Repository } from "typeorm";

import Car from "../entities/Car";

export default class CarRepositoryImpl implements ICarRepository {
  private carRepositoryImpl: Repository<Car>;

  constructor() {
    this.carRepositoryImpl = getRepository(Car);
  }

  async findAllAvailable(filter: IRequestListAvailableCarDTO): Promise<Car[]> {
    const query = this.carRepositoryImpl
      .createQueryBuilder("c")
      .where("available = :available", { available: true });

    if (filter.brand) {
      query.andWhere("c.brand = :brand", { brand: filter.brand });
    }
    if (filter.name) {
      query.andWhere("c.name = :name", { name: filter.name });
    }

    if (filter.category_id) {
      query.andWhere("c.category_id = :category_id", {
        category_id: filter.category_id,
      });
    }

    const cars = await query.getMany();
    return cars;
  }

  async create(data: IRequestCreateCarDTO): Promise<Car> {
    const car = this.carRepositoryImpl.create({ ...data });

    const created = await this.carRepositoryImpl.save(car);
    return created;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.carRepositoryImpl.findOne({ license_plate });
    return car;
  }
}
