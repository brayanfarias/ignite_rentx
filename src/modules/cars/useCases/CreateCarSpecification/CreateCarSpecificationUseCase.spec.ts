import CarRepositoryImplMemory from "@modules/cars/repositories/in-memory/CarRepositoryImplMemory";
import SpecificationImplMemory from "@modules/cars/repositories/in-memory/SpecificationImplMemory";

import AppError from "@shared/errors/AppError";

import CreateCarSpecificationUseCase from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carRepositoryImplMemory: CarRepositoryImplMemory;
let specificationImplMemory: SpecificationImplMemory;

describe("Create car's specifications", () => {
  beforeEach(() => {
    carRepositoryImplMemory = new CarRepositoryImplMemory();
    specificationImplMemory = new SpecificationImplMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carRepositoryImplMemory,
      specificationImplMemory
    );
  });

  it("should be able to add a new specification to the car", async () => {
    const specification = await specificationImplMemory.create({
      name: "specification_name",
      description: "specification description",
    });

    const car = await carRepositoryImplMemory.create({
      name: "Car Test",
      description: "Description Test",
      daily_rate: 0,
      license_plate: "ABC-123",
      fine_amount: 0,
      brand: "Bran Test",
      category_id: "1",
    });

    const specifications_id = [specification.id];

    const updated = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(updated).toHaveProperty("specifications");
    expect(updated.specifications.length).toBe(1);
  });

  it("should be able to add a new specification to a non existent car", async () => {
    const car_id = "1";
    const specifications_id = ["1", "2"];

    expect(async () => {
      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
