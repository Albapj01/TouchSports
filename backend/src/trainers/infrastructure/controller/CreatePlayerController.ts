import { Request, Response } from "express";

import { CreatePalyerUseCase } from "../../application/usecases/CreatePlayerUseCase";
import { PlayerDTO } from "../../application/DTOs/PlayerDTO";

export class CreatePlayerController {
  constructor(private createplayerUseCase: CreatePalyerUseCase) {}

  async handle(req: Request<any, any, PlayerDTO>, res: Response) {
    try {
      await this.createplayerUseCase.run(
        req.params.trainerId,
        req.params.teamId,
        req.body
      );
    } catch (error) {
      return res.status(500).send({ message: "Error" });
    }

    res.status(201).send({ message: "Created player" });
  }
}
