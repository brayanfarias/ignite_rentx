import ICarsImageRepository from "@modules/cars/repositories/ICarsImageRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  car_id: string;
  names: string[];
}

@injectable()
export default class UploadCarImagesUseCase {
  private carsImageRepositoryImpl: ICarsImageRepository;

  constructor(
    @inject("CarsImagesRepositoryImpl")
    carsImageRepositoryImpl: ICarsImageRepository
  ) {
    this.carsImageRepositoryImpl = carsImageRepositoryImpl;
  }

  async execute({ car_id, names }: IRequest): Promise<void> {
    names.map(async (name) => {
      await this.carsImageRepositoryImpl.create(car_id, name);
    });
  }
}
