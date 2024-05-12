import { Request, Response } from "express";

import { CreateCentresUseCase } from "../../application/usecases/CreateCentresUseCase";
import { CentresDTO } from "../../application/DTOs/CentresDTO";

export class CreateCentresController {
  constructor(private createCentresUseCase: CreateCentresUseCase) {}

  async handle(req: Request<unknown, unknown, CentresDTO>, res: Response) {
    const centresData = req.body;

    try {
      await this.createCentresUseCase.run(centresData);
    } catch (error) {
      return res.status(500).send({ message: "Error" });
    }

    res.status(201).send({ message: "Created centres" });
  }
}
