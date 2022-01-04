import { container } from "tsyringe";

import IDateProvider from "./DateProvider/IDateProvider";
import DayjsDateProviderImpl from "./DateProvider/implementations/DayjsDateProviderImpl";

container.registerSingleton<IDateProvider>(
  "DayjsDateProviderImpl",
  DayjsDateProviderImpl
);
