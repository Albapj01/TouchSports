import { Request, Response } from "express";
import { GetAllTeamsUseCase } from "../../application/usecases/GetAllTeamsUseCase";

export class GetAllTeamsController {
  constructor(private getAllTeamsUseCase: GetAllTeamsUseCase) {}

  async handle(req: Request, res: Response) {
    const trainerId = req.params.trainerId;

    try {
      await this.getAllTeamsUseCase.run(trainerId);
    } catch (error) {
      return res.status(500).send({ message: "Error" });
    }

    res.status(201).send({ message: "Obtained teams" });
  }
}
