import ICreateUserDTO from "@modules/accounts/dtos/ICreateUserDTO";
import User from "@modules/accounts/infra/typeorm/entities/User";
import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import { getRepository, Repository } from "typeorm";

export default class UserRepositoryImpl implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }

  async create(userDTO: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({ ...userDTO });

    const created = await this.repository.save(user);

    return created;
  }
}
