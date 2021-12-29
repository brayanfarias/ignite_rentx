import IRequestCreateCarSpecification from "@modules/cars/dtos/IRequestCreateCarSpecification";
import ICarRepository from "@modules/cars/repositories/ICarRepository";

import AppError from "@shared/errors/AppError";

export default class CreateCarSpecificationUseCase {
  private carRepositoryImpl: ICarRepository;
  constructor(carRepositoryImpl: ICarRepository) {
    this.carRepositoryImpl = carRepositoryImpl;
  }
  async execute(data: IRequestCreateCarSpecification): Promise<void> {
    const exists = this.carRepositoryImpl.findById(data.car_id);

    if (exists) {
    } else {
      throw new AppError("Car doesnt exists!");
    }
  }
}
