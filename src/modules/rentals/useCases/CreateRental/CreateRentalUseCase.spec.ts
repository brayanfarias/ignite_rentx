import ICreateRentalDTO from "@modules/rentals/dtos/ICreateRentalDTO";
import RentalRepositoryImplMemory from "@modules/rentals/repositories/in-memory/RentalRepositoryImplMemory";
import dayjs from "dayjs";

import DayjsDateProviderImpl from "@shared/container/providers/DateProvider/implementations/DayjsDateProviderImpl";
import AppError from "@shared/errors/AppError";

import CreateRentalUseCase from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalRepositoryImplMemory: RentalRepositoryImplMemory;
let dateProvider: DayjsDateProviderImpl;

describe("Create Rental", () => {
  const add24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalRepositoryImplMemory = new RentalRepositoryImplMemory();
    dateProvider = new DayjsDateProviderImpl();
    createRentalUseCase = new CreateRentalUseCase(
      rentalRepositoryImplMemory,
      dateProvider
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
