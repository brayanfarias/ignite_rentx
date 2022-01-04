import Car from "@modules/cars/infra/typeorm/entities/Car";
import CarRepositoryImplMemory from "@modules/cars/repositories/in-memory/CarRepositoryImplMemory";

import ListCarUseCase from "./ListAvailableCarUseCase";

let listCarUseCase: ListCarUseCase;
let carRepositoryImplMemory: CarRepositoryImplMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carRepositoryImplMemory = new CarRepositoryImplMemory();
    listCarUseCase = new ListCarUseCase(carRepositoryImplMemory);
  });

  it("should be able to list just the availables cars", async () => {
    await carRepositoryImplMemory.create({
      name: "Car's name",
      description: "Car's description",
      daily_rate: 110,
      license_plate: "XYZ-1254",
      fine_amount: 100,
      brand: "Car's brand",
      category_id: "random_number",
    });

    const cars: Car[] = await listCarUseCase.execute({});

    expect(cars.length).toEqual(1);
    expect(cars[0].available).toBe(true);
  });

  it("should be able to list just the availables cars AND filtering by brand", async () => {
    await carRepositoryImplMemory.create({
      name: "Car's name",
      description: "Car's description",
      daily_rate: 110,
      license_plate: "XYZ-1254",
      fine_amount: 100,
      brand: "Car's brand",
      category_id: "random_number",
    });

    const cars: Car[] = await listCarUseCase.execute({ brand: "Car's brand" });

    expect(cars.length).toEqual(1);
    expect(cars[0].brand).toEqual("Car's brand");
  });

  it("should be able to list just the availables cars AND filtering by name", async () => {
    await carRepositoryImplMemory.create({
      name: "Car's name",
      description: "Car's description",
      daily_rate: 110,
      license_plate: "XYZ-1254",
      fine_amount: 100,
      brand: "Car's brand",
      category_id: "random_number",
    });

    const cars: Car[] = await listCarUseCase.execute({ name: "Car's name" });

    expect(cars.length).toEqual(1);
    expect(cars[0].name).toEqual("Car's name");
  });

  it("should be able to list just the availables cars AND filtering by category", async () => {
    await carRepositoryImplMemory.create({
      name: "Car's name",
      description: "Car's description",
      daily_rate: 110,
      license_plate: "XYZ-1254",
      fine_amount: 100,
      brand: "Car's brand",
      category_id: "random_number",
    });

    const cars: Car[] = await listCarUseCase.execute({
      category_id: "random_number",
    });

    expect(cars.length).toEqual(1);
    expect(cars[0].category_id).toEqual("random_number");
  });
});
