import IRequestCreateCarDTO from "../dtos/IRequestCreateCarDTO";
import IRequestListAvailableCarDTO from "../dtos/IRequestListCarDTO";
import Car from "../infra/typeorm/entities/Car";

export default interface ICarRepository {
  create(data: IRequestCreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAllAvailable(filter: IRequestListAvailableCarDTO): Promise<Car[]>;
  findById(id: string): Promise<Car>;
}
