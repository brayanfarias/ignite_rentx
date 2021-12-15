import ICreateUserDTO from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

interface IUsersRepository {
  findByEmail(email: string): Promise<User>;
  create(userDTO: ICreateUserDTO): Promise<User>;
  findById(id: string): Promise<User>;
}

export { IUsersRepository };
