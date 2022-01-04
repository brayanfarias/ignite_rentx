import CarRepositoryImplMemory from "@modules/cars/repositories/in-memory/CarRepositoryImplMemory";

import AppError from "@shared/errors/AppError";

import CreateCarUseCase from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carRepositoryImpl: CarRepositoryImplMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carRepositoryImpl = new CarRepositoryImplMemory();
    createCarUseCase = new CreateCarUseCase(carRepositoryImpl);
  });

  it("should be able to create a new car", async () => {
    await createCarUseCase.execute({
      name: "Car Test",
      description: "Description Test",
      daily_rate: 0,
      license_plate: "ABC-123",
      fine_amount: 0,
      brand: "Bran Test",
      category_id: "1",
    });
  });

  it("should not be able to create a new car with license plate in use", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car Test 1",
        description: "Description Test",
        daily_rate: 0,
        license_plate: "ABC-123",
        fine_amount: 0,
        brand: "Bran Test",
        category_id: "1",
      });

      await createCarUseCase.execute({
        name: "Car Test 2",
        description: "Description Test",
        daily_rate: 0,
        license_plate: "ABC-123",
        fine_amount: 0,
        brand: "Bran Test",
        category_id: "1",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("car should be created with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Test",
      description: "Description Test",
      daily_rate: 0,
      license_plate: "ABC-123",
      fine_amount: 0,
      brand: "Bran Test",
      category_id: "1",
    });

    expect(car.available).toBe(true);
  });
});
