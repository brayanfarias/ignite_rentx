import ICreateCategoryDTO from "@modules/cars/dtos/ICreateCategoryDTO";
import Category from "@modules/cars/infra/typeorm/entities/Category";

export default interface ICategoryRepository {
  create({ name, description }: ICreateCategoryDTO): Promise<Category>;
  list(): Promise<Category[]>;
  findByName(name: string): Promise<Category>;
}
