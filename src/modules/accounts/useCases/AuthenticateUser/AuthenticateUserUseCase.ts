import IRequestAuthenticate from "@modules/accounts/dtos/IRequestAuthenticate";
import IResponseAuthenticate from "@modules/accounts/dtos/IResponseAuthenticate";
import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppError";

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
