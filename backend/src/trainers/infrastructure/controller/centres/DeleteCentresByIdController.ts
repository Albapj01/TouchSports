import { Request, Response } from "express";

import { DeleteCentresByIdUseCase } from "../../../application/usecases/centres/DeleteCentresByIdUseCase";

export class DeleteCentresByIdController {
  constructor(private deleteCentresByIdUseCase: DeleteCentresByIdUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      await this.deleteCentresByIdUseCase.run(
        req.params.trainerId,
        req.params.centresId
      );
    } catch (error) {
      return res.status(500).send({ message: "Error" });
    }

    res.status(201).send({ message: "Deleted centres" });
  }
}
