import IRequestCreateCar from "@modules/cars/dtos/IRequestCreateCar";
import Car from "@modules/cars/infra/typeorm/entities/Car";
import ICarRepository from "@modules/cars/repositories/ICarRepository";
import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppError";

@injectable()
export default class CreateCarUseCase {
  private carRepositoryImpl: ICarRepository;

  constructor(
    @inject("CarRepositoryImpl")
    carRepositoryImpl: ICarRepository
  ) {
    this.carRepositoryImpl = carRepositoryImpl;
  }
  async execute(data: IRequestCreateCar): Promise<Car> {
    const exists = await this.carRepositoryImpl.findByLicensePlate(
      data.license_plate
    );

    if (exists) {
      throw new AppError("Plate already in use!");
    } else {
      const car: Car = await this.carRepositoryImpl.create(data);
      return car;
    }
  }
}
