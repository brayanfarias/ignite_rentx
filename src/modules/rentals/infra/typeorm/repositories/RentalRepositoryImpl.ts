import ICreateRentalDTO from "@modules/rentals/dtos/ICreateRentalDTO";
import IRentalRepository from "@modules/rentals/repositories/IRentalRepository";
import { getRepository, Repository } from "typeorm";

import Rental from "../entities/Rental";

export default class RentalRepositoryImpl implements IRentalRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne(id);

    return rental;
  }

  async findOpenRenalByUser(user_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: { user_id, end_date: null },
    });
    return rental;
  }
  async findOpenRentaByCar(car_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: { car_id, end_date: null },
    });
    return rental;
  }

  async create(dto: ICreateRentalDTO): Promise<Rental> {
    let rental = this.repository.create({ ...dto });
    rental = await this.repository.save(rental);
    return rental;
  }
}
