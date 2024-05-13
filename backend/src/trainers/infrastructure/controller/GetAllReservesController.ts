import { Request, Response } from "express";
import { GetAllReservesUseCase } from "../../application/usecases/GetAllReservesUseCase";

export class GetAllReservesController {
  constructor(private getAllReservesUseCase: GetAllReservesUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      await this.getAllReservesUseCase.run(req.params.trainerId, req.params.centresId);
    } catch (error) {
      return res.status(500).send({ message: "Error" });
    }

    res.status(201).send({ message: "Obtained reserves" });
  }
}
