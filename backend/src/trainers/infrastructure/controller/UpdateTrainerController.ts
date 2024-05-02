import { Request, Response } from "express";

import { UpdateTrainerUseCase } from "../../application/usecases/UpdateTrainerUseCase";

export class UpdateTrainerController {
  constructor(private updateTrainerUseCase: UpdateTrainerUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      await this.updateTrainerUseCase.run(
        req.params.trainerId,
        req.body
      );
    } catch (error) {
      return res.status(500).send({ message: "Error" });
    }

    res.status(201).send({ message: "Updated trainer" });
  }
}
