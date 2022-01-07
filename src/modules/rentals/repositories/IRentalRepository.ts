import ICreateRentalDTO from "../dtos/ICreateRentalDTO";
import Rental from "../infra/typeorm/entities/Rental";

export default interface IRentalRepository {
  findOpenRenalByUser(user_id: string): Promise<Rental>;
  findOpenRentaByCar(car_id: string): Promise<Rental>;
  create(dto: ICreateRentalDTO): Promise<Rental>;
  findById(id: string): Promise<Rental>;
}
