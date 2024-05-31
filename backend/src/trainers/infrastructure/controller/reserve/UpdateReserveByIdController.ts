import { Request, Response } from "express";

import { UpdateReserveByIdUseCase } from "../../../application/usecases/reserve/UpdateReserveByIdUseCase";

export class UpdateReserveByIdController {
  constructor(private updateReserveByIdUseCase: UpdateReserveByIdUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      await this.updateReserveByIdUseCase.run(
        req.params.trainerId,
        req.params.centresId,
        req.params.reserveId,
        req.body
      );
    } catch (error) {
      return res.status(500).send({ message: "Error" });
    }

    res.status(201).send({ message: "Updated reserve" });
  }
}
