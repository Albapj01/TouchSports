import { Request, Response } from "express";
import { GetTeamByIdUseCase } from "../../application/usecases/GetTeamByIdUseCase";

export class GetTeamByIdController {
  constructor(private getTeamByidUseCase: GetTeamByIdUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      await this.getTeamByidUseCase.run(req.params.trainerId, req.params.teamId);
    } catch (error) {
      return res.status(500).send({ message: "Error" });
    }

    res.status(201).send({ message: "Obtained team" });
  }
}
