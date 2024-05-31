import { Request, Response } from "express";
import { GetPlayerByEmailUseCase } from "../../../application/usecases/player/GetPlayerByEmailUseCase";

export class GetPlayerByEmailController {
  constructor(private getPlayerByEmailUseCase: GetPlayerByEmailUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const player = await this.getPlayerByEmailUseCase.run(
        req.params.trainerEmail,
        req.params.playerEmail
      );
      res.status(201).send({ message: "Obtained player", player });
    } catch (error) {
      return res.status(500).send({ message: "Error" });
    }
  }
}
