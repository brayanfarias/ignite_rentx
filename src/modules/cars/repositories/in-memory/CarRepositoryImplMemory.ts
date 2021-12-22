import IRequestCreateCarDTO from "@modules/cars/dtos/IRequestCreateCarDTO";
import Car from "@modules/cars/infra/typeorm/entities/Car";

import ICarRepository from "../ICarRepository";

export default class CarRepositoryImplMemory implements ICarRepository {
  cars: Car[] = [];

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((c) => c.license_plate === license_plate);
  }

  async create(data: IRequestCreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, { ...data });

    this.cars.push(car);

    return car;
  }
}
