import { Request, Response } from "express";

import { DeleteReserveByIdUseCase } from "../../../application/usecases/reserve/DeleteReserveByIdUseCase";

export class DeleteReserveByIdController {
  constructor(private deleteReserveByIdUseCase: DeleteReserveByIdUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      await this.deleteReserveByIdUseCase.run(
        req.params.trainerId,
        req.params.centresId,
        req.params.reserveId
      );
    } catch (error) {
      return res.status(500).send({ message: "Error" });
    }

    res.status(201).send({ message: "Deleted reserve" });
  }
}
