import CategoryRepositoryImplMemory from "@modules/cars/repositories/in-memory/CategoryRepositoryImplMemory";

import AppError from "@shared/errors/AppError";

import CreateCategoryUseCase from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoryRepositoryImpl: CategoryRepositoryImplMemory;

describe("Create Category", () => {
  beforeEach(() => {
    categoryRepositoryImpl = new CategoryRepositoryImplMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoryRepositoryImpl);
  });

  it("should be able to create a new category", async () => {
    const category = {
      name: "Category Test",
      description: "Description Test",
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    const exist = await categoryRepositoryImpl.findByName(category.name);

    expect(exist).toHaveProperty("id");
  });

  it("should not be able to create a new category with name exists", async () => {
    expect(async () => {
      const category = {
        name: "Category Test",
        description: "Description Test",
      };

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
