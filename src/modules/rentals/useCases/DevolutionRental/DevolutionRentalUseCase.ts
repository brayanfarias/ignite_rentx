import ICarRepository from "@modules/cars/repositories/ICarRepository";
import IDevolutionRentalDTO from "@modules/rentals/dtos/IDevolutionRentalDTO";
import Rental from "@modules/rentals/infra/typeorm/entities/Rental";
import IRentalRepository from "@modules/rentals/repositories/IRentalRepository";
import { inject } from "tsyringe";

import IDateProvider from "@shared/container/providers/DateProvider/IDateProvider";
import AppError from "@shared/errors/AppError";

export default class DevolutionRentalUseCase {
  private MINIMUM_DAILY: 1;

  private rentalRepository: IRentalRepository;
  private carRepository: ICarRepository;
  private dateProvider: IDateProvider;

  constructor(
    @inject("RentalRepositoryImpl")
    rentalRepository: IRentalRepository,
    @inject("CarRepositoryImpl")
    carRepository: ICarRepository,
    @inject("DayjsDateProviderImpl")
    dateProvider: IDateProvider
  ) {
    this.rentalRepository = rentalRepository;
    this.carRepository = carRepository;
    this.dateProvider = dateProvider;
  }
  async execute(dto: IDevolutionRentalDTO): Promise<Rental> {
    const rental = await this.rentalRepository.findById(dto.rental_id);
    const car = await this.carRepository.findById(rental.car_id);

    if (!rental) throw new AppError("Rental doesnt exists!");

    const now = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareInDays(rental.start_date, now);

    if (daily <= 0) {
      daily = this.MINIMUM_DAILY;
    }
    const delay = this.dateProvider.compareInDays(
      now,
      rental.expect_return_date
    );

    let total_fine_amount = 0;
    let total_daily_rate = 0;

    if (delay > 0) {
      total_fine_amount = delay * car.fine_amount;
    }

    total_daily_rate = daily * car.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total_fine_amount + total_daily_rate;

    await this.rentalRepository.create(rental);
    await this.carRepository.updateAvailable(car.id, true);
    return rental;
  }
}
