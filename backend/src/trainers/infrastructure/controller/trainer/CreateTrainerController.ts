import { Request, Response } from "express";

import { TrainerDTO } from "../../../application/DTOs/TrainerDTO";
import { CreateTrainerUseCase } from "../../../application/usecases/trainer/CreateTrainerUseCase";

export class CreateTrainerController {
  constructor(private createTrainerUseCase: CreateTrainerUseCase) {}

  async handle(req: Request<unknown, unknown, TrainerDTO>, res: Response) {
    const trainerData = req.body;

    try {
      await this.createTrainerUseCase.run(trainerData);
    } catch (error) {
      return res.status(500).send({ message: "Error" });
    }

    res.status(201).send({ message: "Created" });
  }
}
