import { Request, Response } from "express";
import { GetAllTeamsUseCase } from "../../../application/usecases/team/GetAllTeamsUseCase";

export class GetAllTeamsController {
  constructor(private getAllTeamsUseCase: GetAllTeamsUseCase) {}

  async handle(req: Request, res: Response) {
    const trainerId = req.params.trainerId;

    try {
      const teams = await this.getAllTeamsUseCase.run(trainerId);
      res.status(201).send({ message: "Obtained teams", teams });
    } catch (error) {
      return res.status(500).send({ message: "Error" });
    }
  }
}
