import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import AppError from "../../../../errors/AppError";
import IRequestAuthenticate from "../../dtos/IRequestAuthenticate";
import IResponseAuthenticate from "../../dtos/IResponseAuthenticate";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
export default class AuthenticateUserUseCase {
  private repository: IUsersRepository;

  constructor(@inject("UserRepositoryImpl") userRepository: IUsersRepository) {
    this.repository = userRepository;
  }
  async execute({
    email,
    password,
  }: IRequestAuthenticate): Promise<IResponseAuthenticate> {
    const user = await this.repository.findByEmail(email);

    if (!user) throw new AppError("E-mail or password incorrect.");

    const valid = await compare(password, user.password);

    if (!valid) throw new AppError("E-mail or password incorrect.");

    const token = sign({}, "a_secret", {
      subject: user.id,
      expiresIn: "1d",
    });

    const response: IResponseAuthenticate = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };

    return response;
  }
}
