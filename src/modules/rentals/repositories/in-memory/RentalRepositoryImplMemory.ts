import Rental from "@modules/rentals/infra/typeorm/entities/Rental";

import IRentalRepository from "../IRentalRepository";

export default class RentalRepositoryImplMemory implements IRentalRepository {
  private rentals: Rental[] = [];

  async findOpenRenalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.user_id === user_id && rental.end_date === null
    );
  }
  async findOpenRentaByCar(car_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.car_id === car_id && rental.end_date === null
    );
  }
}
