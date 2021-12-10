import { Category } from "../../model/Category";
import {
  ICategoryRepository,
  ICreateCategoryDTO,
} from "../ICategoryRepository";

class CategoryRepositoryImpl implements ICategoryRepository {
  private categories: Category[];

  // eslint-disable-next-line no-use-before-define
  private static INSTANCE: CategoryRepositoryImpl;

  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoryRepositoryImpl {
    if (!CategoryRepositoryImpl.INSTANCE) {
      CategoryRepositoryImpl.INSTANCE = new CategoryRepositoryImpl();
    }
    return CategoryRepositoryImpl.INSTANCE;
  }

  create({ name, description }: ICreateCategoryDTO): Category {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });
    this.categories.push(category);
    return category;
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    const category = this.categories.find((c) => c.name === name);
    return category;
  }
}
export { CategoryRepositoryImpl };
