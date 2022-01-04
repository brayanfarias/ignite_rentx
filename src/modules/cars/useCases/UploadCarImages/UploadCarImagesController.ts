import { Request, Response } from "express";
import { container } from "tsyringe";

import UploadCarImagesUseCase from "./UploadCarImagesUseCase";

interface IFiles {
  filename: string;
}

export default class UploadCarImagesController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const names = request.files as IFiles[];
    const uploadCarImageUseCase = container.resolve(UploadCarImagesUseCase);

    const fileNames = names.map((file) => file.filename);

    await uploadCarImageUseCase.execute({ car_id: id, names: fileNames });

    return response.status(201).send();
  }
}
