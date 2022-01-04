import User from "@modules/accounts/infra/typeorm/entities/User";
import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";

export default class UserRepositoryImpl implements IUsersRepository {
  users: User[] = [];

  async findByEmail(email: string): Promise<User> {
    return this.users.find((u) => u.email === email);
  }

  async create({ name, password, email, driver_license }): Promise<User> {
    const user = new User();

    Object.assign(user, {
      name,
      password,
      email,
      driver_license,
    });

    this.users.push(user);
    return user;
  }
  async findById(id: string): Promise<User> {
    return this.users.find((u) => u.id === id);
  }
}
