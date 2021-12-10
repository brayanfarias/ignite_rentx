import { Category } from "../model/Category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}
interface ICategoryRepository {
  create({ name, description }: ICreateCategoryDTO): Category;
  list(): Category[];
  findByName(name: string): Category;
}

export { ICategoryRepository, ICreateCategoryDTO };
