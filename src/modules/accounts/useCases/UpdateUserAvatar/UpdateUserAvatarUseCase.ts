import { inject, injectable } from "tsyringe";

import { deleteFile } from "../../../../utils/file";
import IRequestUpdateAvatar from "../../dtos/IRequestUpdateAvatar";
import { IUsersRepository } from "../../repositories/IUsersRepository";

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
