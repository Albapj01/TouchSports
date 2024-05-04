import { Request, Response } from "express";
import { GetAllPlayersUseCase } from "../../application/usecases/GetAllPlayersUseCase";

export class GetAllPlayersController {
  constructor(private getAllPlayersUseCase: GetAllPlayersUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      await this.getAllPlayersUseCase.run(req.params.trainerId, req.params.teamId);
    } catch (error) {
      return res.status(500).send({ message: "Error" });
    }

    res.status(201).send({ message: "Obtained players" });
  }
}
