import { Request, Response } from "express";

import { UpdateTeamByIdUseCase } from "../../application/usecases/UpdateTeamByIdUseCase";

export class UpdateTeamByIdController {
  constructor(private updateTeamByIdUseCase: UpdateTeamByIdUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      await this.updateTeamByIdUseCase.run(
        req.params.trainerId,
        req.params.teamId,
        req.body
      );
    } catch (error) {
      console.error("Error updating team:", error);
      return res.status(500).send({ message: "Error" });
    }

    res.status(201).send({ message: "Updated team" });
  }
}
