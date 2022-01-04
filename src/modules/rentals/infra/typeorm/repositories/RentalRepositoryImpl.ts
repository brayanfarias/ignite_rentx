import ICreateRentalDTO from "@modules/rentals/dtos/ICreateRentalDTO";
import IRentalRepository from "@modules/rentals/repositories/IRentalRepository";
import { getRepository, Repository } from "typeorm";

import Rental from "../entities/Rental";

export default class RentalRepositoryImpl implements IRentalRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findOpenRenalByUser(user_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({ user_id });
    return rental;
  }
  async findOpenRentaByCar(car_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({ car_id });
    return rental;
  }

  async create(dto: ICreateRentalDTO): Promise<Rental> {
    let rental = this.repository.create({ ...dto });
    rental = await this.repository.save(rental);
    return rental;
  }
}
