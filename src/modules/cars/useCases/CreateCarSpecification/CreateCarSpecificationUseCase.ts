import IRequestCreateCarSpecification from "@modules/cars/dtos/IRequestCreateCarSpecification";
import Car from "@modules/cars/infra/typeorm/entities/Car";
import ICarRepository from "@modules/cars/repositories/ICarRepository";
import ISpecificationRepository from "@modules/cars/repositories/ISpecificationRepository";

import AppError from "@shared/errors/AppError";

export default class CreateCarSpecificationUseCase {
  private carRepositoryImpl: ICarRepository;
  private specificationRepositoryImpl: ISpecificationRepository;
  constructor(
    carRepositoryImpl: ICarRepository,
    specificationRepositoryImpl: ISpecificationRepository
  ) {
    this.carRepositoryImpl = carRepositoryImpl;
    this.specificationRepositoryImpl = specificationRepositoryImpl;
  }
  async execute(data: IRequestCreateCarSpecification): Promise<Car> {
    const car = await this.carRepositoryImpl.findById(data.car_id);

    if (!car) throw new AppError("Car doesnt exists!");

    const specifications = await this.specificationRepositoryImpl.findByIds(
      data.specifications_id
    );

    car.specifications = specifications;

    const updated = await this.carRepositoryImpl.create(car);

    return updated;
  }
}
