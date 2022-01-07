import Rental from "@modules/rentals/infra/typeorm/entities/Rental";
import IRentalRepository from "@modules/rentals/repositories/IRentalRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export default class ListRentalsByUserUseCase {
  private rentalRepository: IRentalRepository;

  constructor(
    @inject("RentalRepositoryImpl")
    rentalRepository: IRentalRepository
  ) {
    this.rentalRepository = rentalRepository;
  }
  async execute(id: string): Promise<Rental[]> {
    const rentals = await this.rentalRepository.findAllByUser(id);
    return rentals;
  }
}
