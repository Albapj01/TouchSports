import { Request, Response } from "express";
import { GetPlayerByIdUseCase } from "../../application/usecases/GetPlayerByIdUseCase";

export class GetPlayerByIdController {
  constructor(private getPlayerByIdUseCase: GetPlayerByIdUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const player = await this.getPlayerByIdUseCase.run(req.params.trainerId, req.params.teamId, req.params.playerId);
      res.status(201).send({ message: "Obtained player", player });
    } catch (error) {
      return res.status(500).send({ message: "Error" });
    }
  }
}
