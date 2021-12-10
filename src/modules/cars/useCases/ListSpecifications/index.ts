import { SpecificationRepositoryImpl } from "../../repositories/implementations/SpecificationRepositoryImpl";
import { ListSpecificationsController } from "./ListSpecificationsController";
import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

const specificationRepositoryImpl = SpecificationRepositoryImpl.getInstance();
const listSpecificationsUseCase = new ListSpecificationsUseCase(
  specificationRepositoryImpl
);
const listSpecificationsController = new ListSpecificationsController(
  listSpecificationsUseCase
);

export { listSpecificationsController };
