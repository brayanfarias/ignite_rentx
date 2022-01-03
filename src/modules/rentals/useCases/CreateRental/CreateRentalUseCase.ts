import ICreateRentalDTO from "@modules/rentals/dtos/ICreateRentalDTO";
import Rental from "@modules/rentals/infra/typeorm/entities/Rental";
import IRentalRepository from "@modules/rentals/repositories/IRentalRepository";
import { inject, injectable } from "tsyringe";

import IDateProvider from "@shared/container/providers/DateProvider/IDateProvider";
import AppError from "@shared/errors/AppError";

@injectable()
export default class CreateRentalUseCase {
  private rentalRepository: IRentalRepository;
  private dateProvider: IDateProvider;

  constructor(
    @inject("RentalRepositoryImpl")
    rentalRepository: IRentalRepository,
    @inject("DayjsDateProviderImpl")
    dateProvider: IDateProvider
  ) {
    this.rentalRepository = rentalRepository;
    this.dateProvider = dateProvider;
  }

  async execute(dto: ICreateRentalDTO): Promise<Rental> {
    const minimumHours = 24;

    const carUnavailable = await this.rentalRepository.findOpenRentaByCar(
      dto.car_id
    );

    if (carUnavailable) throw new AppError("Car isnt available!");

    const rentalOpenToUser = await this.rentalRepository.findOpenRenalByUser(
      dto.user_id
    );

    if (rentalOpenToUser)
      throw new AppError("There is a rental in progress for user!");

    const dateNow = this.dateProvider.dateNow();

    const compare = this.dateProvider.compareInHours(
      dateNow,
      dto.expected_return_date
    );

    if (compare < minimumHours) {
      throw new AppError("Invalid return time");
    }

    const rental = await this.rentalRepository.create(dto);
    return rental;
  }
}
