import IRequestCreateCarDTO from "@modules/cars/dtos/IRequestCreateCarDTO";
import IRequestListAvailableCarDTO from "@modules/cars/dtos/IRequestListCarDTO";
import Car from "@modules/cars/infra/typeorm/entities/Car";

import ICarRepository from "../ICarRepository";

export default class CarRepositoryImplMemory implements ICarRepository {
  cars: Car[] = [];

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((c) => c.license_plate === license_plate);
  }

  async findAllAvailable(filter: IRequestListAvailableCarDTO): Promise<Car[]> {
    const justCarsAvailables = this.cars.filter((car) => car.available);

    if (filter.brand || filter.category_id || filter.name) {
      const filteredByParameters = justCarsAvailables.filter(
        (car) =>
          (filter.brand && car.brand === filter.brand) ||
          (filter.category_id && car.category_id === filter.category_id) ||
          (filter.name && car.name === filter.name)
      );
      return filteredByParameters;
    }
    return justCarsAvailables;
  }

  async create(data: IRequestCreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, { ...data });

    this.cars.push(car);

    return car;
  }
}
