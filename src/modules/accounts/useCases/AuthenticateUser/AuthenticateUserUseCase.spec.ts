import ICreateUserDTO from "@modules/accounts/dtos/ICreateUserDTO";
import UserRepositoryImpl from "@modules/accounts/repositories/in-memory/UserRepositoryImpl";
import CreateUserUseCase from "@modules/accounts/useCases/CreateUser/CreateUserUseCase";

import AppError from "@shared/errors/AppError";

import AuthenticateUserUseCase from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryImpl: UserRepositoryImpl;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    userRepositoryImpl = new UserRepositoryImpl();
    authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryImpl);
    createUserUseCase = new CreateUserUseCase(userRepositoryImpl);
  });

  it("should be able to authenticate an user ", async () => {
    const user: ICreateUserDTO = {
      driver_license: "12345",
      email: "user@teste.com",
      password: "12345",
      name: "User test",
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate a nonexistent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "user@teste.com",
        password: "12345",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with incorrect password", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "12345",
        email: "user@teste.com",
        password: "12345",
        name: "User test",
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "incorrect_password",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
