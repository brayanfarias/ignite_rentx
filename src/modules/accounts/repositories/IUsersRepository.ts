import ICreateUserDTO from "@modules/accounts/dtos/ICreateUserDTO";
import User from "@modules/accounts/infra/typeorm/entities/User";

export default interface IUsersRepository {
  findByEmail(email: string): Promise<User>;
  create(userDTO: ICreateUserDTO): Promise<User>;
  findById(id: string): Promise<User>;
}
