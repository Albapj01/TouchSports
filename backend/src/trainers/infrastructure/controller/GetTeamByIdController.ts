import { Request, Response } from "express";
import { GetTeamByIdUseCase } from "../../application/usecases/GetTeamByIdUseCase";

export class GetTeamByIdController {
  constructor(private getTeamByidUseCase: GetTeamByIdUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const team = await this.getTeamByidUseCase.run(req.params.trainerId, req.params.teamId);
      res.status(201).send({ message: "Obtained team", team });
    } catch (error) {
      return res.status(500).send({ message: "Error" });
    }
  }
}
