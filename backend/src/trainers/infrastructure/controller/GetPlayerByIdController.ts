import { Request, Response } from "express";
import { GetPlayerByIdUseCase } from "../../application/usecases/GetPlayerByIdUseCase";

export class GetPlayerByIdController {
  constructor(private getPlayerByidUseCase: GetPlayerByIdUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      await this.getPlayerByidUseCase.run(req.params.trainerId, req.params.teamId, req.params.playerId);
    } catch (error) {
      return res.status(500).send({ message: "Error" });
    }

    res.status(201).send({ message: "Obtained player" });
  }
}
