import IRequestListAvailableCarDTO from "@modules/cars/dtos/IRequestListCarDTO";
import Car from "@modules/cars/infra/typeorm/entities/Car";
import ICarRepository from "@modules/cars/repositories/ICarRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export default class ListAvailableCarUseCase {
  private carRepository: ICarRepository;
  constructor(
    @inject("CarRepositoryImpl")
    carRepository: ICarRepository
  ) {
    this.carRepository = carRepository;
  }

  async execute(filter: IRequestListAvailableCarDTO): Promise<Car[]> {
    const car: Car[] = await this.carRepository.findAllAvailable(filter);
    return car;
  }
}
