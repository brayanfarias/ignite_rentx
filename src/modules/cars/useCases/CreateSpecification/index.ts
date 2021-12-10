import { SpecificationRepositoryImpl } from "../../repositories/implementations/SpecificationRepositoryImpl";
import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

const specificationRepositoryImpl = SpecificationRepositoryImpl.getInstance();
const createSpecificationUseCase = new CreateSpecificationUseCase(
  specificationRepositoryImpl
);
const createSpecificationController = new CreateSpecificationController(
  createSpecificationUseCase
);

export { createSpecificationController };
