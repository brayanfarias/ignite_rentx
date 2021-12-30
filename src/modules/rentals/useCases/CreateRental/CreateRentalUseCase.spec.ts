import RentalRepositoryImplMemory from "@modules/rentals/repositories/in-memory/RentalRepositoryImplMemory";

import CreateRentalUseCase from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalRepositoryImplMemory: RentalRepositoryImplMemory;

describe("Create Rental", () => {
  beforeEach(() => {
    rentalRepositoryImplMemory = new RentalRepositoryImplMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalRepositoryImplMemory);
  });
  it("should be able to create a rental", async () => {
    await createRentalUseCase.execute();
  });
});
