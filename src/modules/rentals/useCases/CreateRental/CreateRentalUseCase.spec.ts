import CarRepositoryImplMemory from "@modules/cars/repositories/in-memory/CarRepositoryImplMemory";
import ICreateRentalDTO from "@modules/rentals/dtos/ICreateRentalDTO";
import RentalRepositoryImplMemory from "@modules/rentals/repositories/in-memory/RentalRepositoryImplMemory";
import dayjs from "dayjs";

import DayjsDateProviderImpl from "@shared/container/providers/DateProvider/implementations/DayjsDateProviderImpl";
import AppError from "@shared/errors/AppError";

import CreateRentalUseCase from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalRepositoryImplMemory: RentalRepositoryImplMemory;
let dateProvider: DayjsDateProviderImpl;
let carRepositoryImplMemory: CarRepositoryImplMemory;

describe("Create Rental", () => {
  const add24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalRepositoryImplMemory = new RentalRepositoryImplMemory();
    carRepositoryImplMemory = new CarRepositoryImplMemory();
    dateProvider = new DayjsDateProviderImpl();
    createRentalUseCase = new CreateRentalUseCase(
      rentalRepositoryImplMemory,
      dateProvider,
      carRepositoryImplMemory
    );
  });

  it("should be able to create a new rental", async () => {
    const input: ICreateRentalDTO = {
      user_id: "12345",
      car_id: "121212",
      expected_return_date: add24Hours,
    };
    const rental = await createRentalUseCase.execute(input);

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should return car as available false when create new rental", async () => {
    const { id } = await carRepositoryImplMemory.create({
      name: "Car Test",
      description: "Description Test",
      daily_rate: 0,
      license_plate: "ABC-123",
      fine_amount: 0,
      brand: "Brand Test",
      category_id: "1",
    });

    const input: ICreateRentalDTO = {
      user_id: "12345",
      car_id: id,
      expected_return_date: add24Hours,
    };

    await createRentalUseCase.execute(input);

    const car = await carRepositoryImplMemory.findById(input.car_id);

    expect(car.available).toBeFalsy();
  });

  it("should not be able to create a new rental if there's another open to the same user", async () => {
    const input: ICreateRentalDTO = {
      user_id: "12345",
      car_id: "121212",
      expected_return_date: add24Hours,
    };

    expect(async () => {
      await createRentalUseCase.execute(input);

      await createRentalUseCase.execute(input);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if there's another open to the same car", async () => {
    const input: ICreateRentalDTO = {
      user_id: "123",
      car_id: "121212",
      expected_return_date: add24Hours,
    };

    const input2: ICreateRentalDTO = {
      user_id: "321",
      car_id: "121212",
      expected_return_date: add24Hours,
    };

    expect(async () => {
      await createRentalUseCase.execute(input);

      await createRentalUseCase.execute(input2);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with invalid return", async () => {
    const input: ICreateRentalDTO = {
      user_id: "123",
      car_id: "121212",
      expected_return_date: dayjs().toDate(),
    };

    expect(async () => {
      await createRentalUseCase.execute(input);
    }).rejects.toBeInstanceOf(AppError);
  });
});
