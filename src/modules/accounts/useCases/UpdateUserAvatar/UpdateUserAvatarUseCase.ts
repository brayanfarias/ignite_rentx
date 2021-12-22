import IRequestUpdateAvatar from "@modules/accounts/dtos/IRequestUpdateAvatar";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { deleteFile } from "@utils/file";
import { inject, injectable } from "tsyringe";

@injectable()
export default class UpdateUserAvatarUseCase {
  private repository: IUsersRepository;

  constructor(@inject("UserRepositoryImpl") userRepository: IUsersRepository) {
    this.repository = userRepository;
  }
  async execute({ user_id, avatar_file }: IRequestUpdateAvatar): Promise<void> {
    const user = await this.repository.findById(user_id);

    const oldFile = user.avatar;
    if (oldFile) await deleteFile(`./tmp/avatar/${oldFile}`);

    user.avatar = avatar_file;

    await this.repository.create(user);
  }
}
