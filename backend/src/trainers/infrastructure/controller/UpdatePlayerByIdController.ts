import { Request, Response } from "express";

import { UpdatePlayerByIdUseCase } from "../../application/usecases/UpdatePlayerByIdUseCase";

export class UpdatePlayerByIdController {
  constructor(private updatePlayerByIdUseCase: UpdatePlayerByIdUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      await this.updatePlayerByIdUseCase.run(
        req.params.trainerId,
        req.params.teamId,
        req.params.playerId,
        req.body
      );
    } catch (error) {
      return res.status(500).send({ message: "Error" });
    }

    res.status(201).send({ message: "Updated player" });
  }
}
