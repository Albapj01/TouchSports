import { Request, Response } from "express";

import { DeleteTeamByIdUseCase } from "../../application/usecases/DeleteTeamByIdUseCase";

export class DeleteTeamByIdController {
  constructor(private deleteTeamByIdUseCase: DeleteTeamByIdUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      await this.deleteTeamByIdUseCase.run(req.params.trainerId, req.params.teamId);
    } catch (error) {
      return res.status(500).send({ message: "Error" });
    }

    res.status(201).send({ message: "Deleted team" });
  }
}
