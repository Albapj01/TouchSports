import { Request, Response } from "express";

import { UpdateCentresByIdUseCase } from "../../application/usecases/UpdateCentresByIdUseCase";

export class UpdateCentresmByIdController {
  constructor(private updateCentresByIdUseCase: UpdateCentresByIdUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      await this.updateCentresByIdUseCase.run(
        req.params.trainerId,
        req.params.centresId,
        req.body
      );
    } catch (error) {
      return res.status(500).send({ message: "Error" });
    }

    res.status(201).send({ message: "Updated centres" });
  }
}
