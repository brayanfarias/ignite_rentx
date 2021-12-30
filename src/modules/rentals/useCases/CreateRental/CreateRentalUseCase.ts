import ICreateRentalDTO from "@modules/rentals/dtos/ICreateRentalDTO";
import IRentalRepository from "@modules/rentals/repositories/IRentalRepository";

import AppError from "@shared/errors/AppError";

export default class CreateRentalUseCase {
  private rentalRepository: IRentalRepository;

  constructor(rentalRepository: IRentalRepository) {
    this.rentalRepository = rentalRepository;
  }

  async execute(data: ICreateRentalDTO): Promise<void> {
    const carUnavailable = await this.rentalRepository.findOpenRentaByCar(
      data.car_id
    );

    if (carUnavailable) throw new AppError("Car isnt available!");

    const rentalOpenToUser = await this.rentalRepository.findOpenRenalByUser(
      data.user_id
    );

    if (rentalOpenToUser)
      throw new AppError("There is a rental in progress for user!");
  }
}
