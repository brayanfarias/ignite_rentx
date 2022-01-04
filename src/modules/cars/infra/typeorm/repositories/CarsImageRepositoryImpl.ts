import ICarsImageRepository from "@modules/cars/repositories/ICarsImageRepository";
import { getRepository, Repository } from "typeorm";

import CarImage from "../entities/CarImage";

export default class CarsImageRepositoryImpl implements ICarsImageRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }
  async create(car_id: string, name: string): Promise<CarImage> {
    const carImage = this.repository.create({ car_id, name });

    await this.repository.save(carImage);

    return carImage;
  }
}
