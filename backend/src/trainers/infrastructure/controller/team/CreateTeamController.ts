import { Request, Response } from "express";

import { CreateTeamUseCase } from "../../../application/usecases/team/CreateTeamUseCase";
import { TeamDTO } from "../../../application/DTOs/TeamDTO";

export class CreateTeamController {
  constructor(private createTeamUseCase: CreateTeamUseCase) {}

  async handle(req: Request<unknown, unknown, TeamDTO>, res: Response) {
    const teamData = req.body;

    try {
      await this.createTeamUseCase.run(teamData);
    } catch (error) {
      return res.status(500).send({ message: "Error" });
    }

    res.status(201).send({ message: "Created team" });
  }
}
