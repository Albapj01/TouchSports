import { Request, Response } from "express";

import { DeletePlayerByIdUseCase } from "../../application/usecases/DeletePlayerByIdUseCase";

export class DeletePlayerByIdController {
  constructor(private deletePlayerByIdUseCase: DeletePlayerByIdUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      await this.deletePlayerByIdUseCase.run(req.params.trainerId, req.params.teamId, req.params.playerId);
    } catch (error) {
      return res.status(500).send({ message: "Error" });
    }

    res.status(201).send({ message: "Deleted player" });
  }
}
