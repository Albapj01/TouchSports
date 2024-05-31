import { Request, Response } from "express";

import { CreateReserveUseCase } from "../../../application/usecases/reserve/CreateReserveUseCase";
import { ReserveDTO } from "../../../application/DTOs/ReserveDTO";

export class CreateReserveController {
  constructor(private createReserveUseCase: CreateReserveUseCase) {}

  async handle(req: Request<any, any, ReserveDTO>, res: Response) {
    try {
      await this.createReserveUseCase.run(
        req.params.trainerId,
        req.params.centresId,
        req.body
      );
    } catch (error) {
      return res.status(500).send({ message: "Error" });
    }

    res.status(201).send({ message: "Created reserve" });
  }
}
