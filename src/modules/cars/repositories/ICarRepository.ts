import IRequestCreateCarDTO from "../dtos/IRequestCreateCarDTO";
import Car from "../infra/typeorm/entities/Car";

export default interface ICarRepository {
  create(data: IRequestCreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
}
