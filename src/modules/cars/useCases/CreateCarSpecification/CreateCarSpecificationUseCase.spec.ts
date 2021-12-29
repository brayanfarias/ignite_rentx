import CarRepositoryImplMemory from "@modules/cars/repositories/in-memory/CarRepositoryImplMemory";

import AppError from "@shared/errors/AppError";

import CreateCarSpecificationUseCase from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carRepositoryImplMemory: CarRepositoryImplMemory;

describe("Create car's specifications", () => {
  beforeEach(() => {
    carRepositoryImplMemory = new CarRepositoryImplMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carRepositoryImplMemory
    );
  });

  it("should be able to add a new specification to the car", async () => {
    const car = await carRepositoryImplMemory.create({
      name: "Car Test",
      description: "Description Test",
      daily_rate: 0,
      license_plate: "ABC-123",
      fine_amount: 0,
      brand: "Bran Test",
      category_id: "1",
    });

    const specifications_id = ["1", "2"];

    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });
  });

  it("should be able to add a new specification to a non existent car", async () => {
    const car_id = "1";
    const specifications_id = ["1", "2"];

    expect(async () => {
      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toThrow(AppError);
  });
});
